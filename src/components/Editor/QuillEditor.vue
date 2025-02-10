<template>
  <div :class="prefixCls">
    <a-upload
      class="avatar-uploader"
      ref="uploadDrag"
      :auto-upload="false"
      accept=".png,.jpg,.jpeg"
      :action="baseUrl"
      :show-file-list="false"
      @change="handleChange"
      :headers="{
        Authorization: `Bearer ${token}`
      }"
      drag
      style="display:none;"
    >
      <a-icon type="plus" />
    </a-upload>

    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { quillEditor, Quill } from 'vue-quill-editor'
import storage from 'store'

import imageResize from 'quill-image-resize-module' // 添加
Quill.register('modules/imageResize', imageResize)

const Parchment = Quill.import('parchment')
class lineHeightAttributor extends Parchment.Attributor.Style {}
// eslint-disable-next-line new-cap
const lineHeightStyle = new lineHeightAttributor('lineHeight', 'line-height', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['initial', '1', '1.5', '1.75', '2', '3', '4', '5']
})

Quill.register({ 'formats/lineHeight': lineHeightStyle }, true)

// 自定义字号的大小

var sizes = ['12px', '14px', '16px', '18px', '20px', '22px', '26px', '28px', '30px', '36px', '42px']
var Size = Quill.import('formats/size')
Size.whitelist = sizes

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ direction: 'rtl' }], // 文本方向
  [{ size: sizes }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'], // 链接、图片、视频
  [{ lineheight: ['initial', '1', '1.5', '1.75', '2', '3', '4', '5'] }] // 行高
]

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data () {
    return {
      content: null,
      token: storage.get(ACCESS_TOKEN),
      baseUrl: process.env.VUE_APP_API_BASE_URL + '/file/upload',
      editorOption: {
        // some quill options
        placeholder: this.placeholder,
        modules: {
          imageResize: { // 添加
            displayStyles: { // 添加
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize'] // 添加
          },
          toolbar: {
            container: toolbar,
            handlers: {
              lineheight: function (value) {
                if (value) {
                  this.quill.format('lineHeight', value)
                } else {
                  console.log(value)
                }
              },
              image: function (value) {
                if (value) {
                  // 调用element的图片上传组件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        console.log('上传中')
        return
      }
      if (info.file.status === 'done') {
        // this.form[key + 'image'] = info.file.response.data.url
        // // this.form[key] = info.file.response.data.fid
        // this.$set(this.form, key, info.file.response.data.fid)
        // this.form[key + 'loading'] = true
        const res = info.file.response
        if (res.data) {
        // 获取光标所在位置
          const length = this.editor.getSelection().index
          // 插入图片，res为服务器返回的图片链接地址
          this.editor.insertEmbed(length, 'image', res.data)
          // 调整光标到最后
          this.editor.setSelection(length + 1)
        } else {
        // 提示信息，需引入Message
          this.$message.error('图片上传失败!')
        }
      }
    },
    onEditorBlur (quill, e) {
      console.log('editor blur!', quill, e)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill, this)
      Quill.register({ 'formats/lineHeight': lineHeightStyle }, true)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
      this.$emit('change', html)
      this.$emit('input', html)
    }
  },
  watch: {
    value: {
        immediate: true,
        handler (val) {
            this.content = val
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');

/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    border-radius: 0 0 @border-radius-base @border-radius-base;
  }
}
/deep/ .ql-container {
  min-height: 200px;
}
/deep/ .ql-snow .ql-picker {
  height: 28px;
}
.uploader {
  display: none;
}
</style>
<style lang="less">
//配置编辑器行高
.ql-snow .ql-picker.ql-lineheight .ql-picker-label::before {
  content: '行高';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='initial']::before {
  content: '默认';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1']::before {
  content: '1';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.5']::before {
  content: '1.5';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.75']::before {
  content: '1.75';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='2']::before {
  content: '2';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='3']::before {
  content: '3';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='4']::before {
  content: '4';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='5']::before {
  content: '5';
}
.ql-snow .ql-picker.ql-lineheight {
  width: 70px;
}
/* 字号设置 */
/* 默认字号 */
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
  font-size: 12px;
}

.ql-size-12px {
  font-size: 12px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
  font-size: 14px;
}

.ql-size-14px {
  font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
  font-size: 16px;
}

.ql-size-16px {
  font-size: 16px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
  font-size: 18px;
}

.ql-size-18px {
  font-size: 18px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
  font-size: 20px;
}

.ql-size-20px {
  font-size: 20px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22px"]::before {
  content: "22px";
  font-size: 22px;
}

.ql-size-22px {
  font-size: 22px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="26px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="26px"]::before {
  content: "26px";
  font-size: 26px;
}

.ql-size-26px {
  font-size: 26px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  content: "28px";
  font-size: 28px;
}

.ql-size-28px {
  font-size: 28px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before {
  content: "30px";
  font-size: 30px;
}

.ql-size-30px {
  font-size: 30px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
  font-size: 36px;
}

.ql-size-36px {
  font-size: 36px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="42px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="42px"]::before {
  content: "42px";
  font-size: 42px;
}

.ql-size-42px {
  font-size: 42px;
}

.disabled,
.disabled .ql-snow,
.disabled .ql-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}
.disabled {
  position: relative;
  z-index: 9;
}
</style>
