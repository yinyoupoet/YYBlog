<template>
    <div>
      <div class="blog-edit-main-div">
        <div class="editor-top-bar">
          <span class="goto-left-span"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>

          <button class="view-btn title-btn">预览</button>

          <div class="right-title-div">
            <button class="save-btn title-btn">保存到草稿</button>
            <button class="publish-btn title-btn">发布</button>
          </div>

        </div>
        <div class="editor-main-div">

          <div class="title-input-div">
            <input type="text" class="blog-title-input" placeholder="请输入标题" />
          </div>


          <div class="editor-div" id="codex-editor" v-html="editorString"></div>
        </div>


        <div class="container">
          <BaseBottomBar></BaseBottomBar>
        </div>
      </div>

      <BaseLive2d></BaseLive2d>
    </div>
</template>

<script>
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import EditorJS from '@editorjs/editorjs';
    import Header  from '@editorjs/header';
    import LinkTool   from '@editorjs/link';
    import SimpleImage   from '@editorjs/simple-image';
    import Image   from '@editorjs/image';
    import CheckList from '@editorjs/checklist';
    import List from '@editorjs/list';
    import Embed from '@editorjs/embed';
    import Quote from '@editorjs/quote';
    import Code from '@editorjs/code';
    import Paragraph from '@editorjs/paragraph';
    import RawHtml from '@editorjs/raw';
    import Marker from '@editorjs/marker';
    import Delimiter from '@editorjs/delimiter';
    import Table from '@editorjs/table';
    import InlineCode from '@editorjs/inline-code';
    import BaseLive2d from "../../components/bases/BaseLive2d";

    export default {
      name: "EditBlog",
      mounted() {
        var _this = this;
        const editor = new EditorJS({
          holderId: 'codex-editor',
          tools: {
            header: {
              class: Header,

            },
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: '/codex/editor/fetchUrl'
              }
            },
            /*simpleImage: SimpleImage,*/
            image: {
              class: Image,
              config: {
                uploader: {
                  uploadByFile(file) {
                    console.log("upload");
                    console.log(file);
                    let formData = new FormData();
                    formData.append("avatar", file);
                    formData.append("userId", _this.userId);
                    return _this.$http.post('http://127.0.0.1:8080/upload/byFile', formData)
                      .then((response) => {
                        if(response.data.success == 1){
                          return {
                            success: 1,
                            file: {
                              url: response.data.url
                            }
                          }
                        }
                        else {
                          // 图片上传失败
                          alert(response.data.reason);
                          return {
                            success: 0
                          }
                        }
                      }).catch((exception) => {
                        console.log(exception);
                        return {
                          success: 0,
                        }
                      });
                  },
                  uploadByUrl(url){
                    return _this.$http.post('http://127.0.0.1:8080/upload/byUrl', {
                      userId: _this.userId,
                      url: url
                    }).then((response) => {
                      return {
                        success: 1,
                        file: {
                          url: response.data.url
                        }
                      }
                    }).catch((exception) => {
                      return {
                        success: 1,
                        file: {
                          url: url
                        }
                      }
                    });
                  }
                }
              }
            },
            checkList: CheckList,
            list: List,
            embed: {
              class: Embed,
              config: {
                services: {
                  coub: true,
                  youtube: true,
                  codepen: true,
                  'twitch-video': true,
                  'twitch-channel': true
                }
              }
            },
            quote: Quote,
            code: Code,
            paragraph: {
              class: Paragraph,
              inlineToolbar: true
            },
            raw: RawHtml,
            marker: Marker,
            delimiter: Delimiter,
            table: Table,
            inlineCode: InlineCode
          },
          data: {
            "time": 1550476186479,
            "blocks": [
              {
                "type": "paragraph",
                "data": {
                  "text": "请输入..."
                }
              }
            ],
            "version": "2.13.0",
          }
        });

        this.editorObj = editor;


      },
      components: {BaseLive2d, BaseBottomBar},
      data: function() {
        return {
          editorString: '<script src="/static/style/editor.js"><\/script>',
          editorObj: '',  /*用来获取mounted里面定义的editor对象，用来实现save方法*/
          temp: '请输入...',
          userId: 11
        }
      },
      methods: {
        save: function() {
          this.editorObj.save().then((outputData) => {
            console.log('Article data: ', outputData)
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        }
      }
    }
</script>

<style scoped>
  .blog-edit-main-div {
    background: #fff;
    font-family: 'Comic Sans MS','Open Sans','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
  }

  .editor-top-bar{
    height: 56px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }

  .editor-main-div{
    text-align: center;
  }

  .editor-div{
    text-align: left;
    display: inline-block;
    border: 1px solid #eee;
    border-radius: 20px;
    background: #fff;
    width: 850px;
    padding: 30px 50px;
    letter-spacing: 2px;
  }

  .title-input-div{
    margin: 20px auto;
  }

  .blog-title-input{
    width: 850px;
    font-size: 2em;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
  }

  .blog-title-input:hover{
    border: 1px solid #607d8b;
  }
  .blog-title-input:focus{
    border: 1px solid #00bcd4;
  }

  .goto-left-span {
    display: inline-block;
    padding: 12px 20px;
    font-size: 1.5em;
    border-right: 1px solid #ccc;
    transition: all 0.5s;
    cursor: pointer;
  }

  .goto-left-span:hover{
    background: #f1562a;
    color: #fff;
  }

  .title-btn{
    border: 1px solid #B18F6A;
    text-align: center;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 10px 15px;

    font-size: 16px;
    text-decoration: none;
    line-height: 1;
    transition: all 0.3s;
    background: transparent;
    font-weight: 500;
    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, STHeiti, WenQuanYi Micro Hei, Helvetica, Arial, sans-serif;
    letter-spacing: 2px;
  }


  .view-btn {
    color: #F1562A;
    margin-left: 30px;
  }

  .view-btn:hover{
    background: #f1562a;
    color: #fff;
  }

  .right-title-div {
    display: inline-block;
    position: absolute;
    right: 120px;
    top: 10px;
  }

  .save-btn:hover{
    background: #9e9e9e;
    color: #fff;
  }

  .publish-btn{
    margin-left: 20px;
    background: #4caf50;
    color: #fff;
  }

  .publish-btn:hover{
    background: #f1562a;
  }
</style>


