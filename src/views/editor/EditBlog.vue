<template>
    <div>
      <div class="blog-edit-main-div">
        <div class="editor-top-bar">
          <span class="goto-left-span" @click="goback()"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>

          <button class="view-btn title-btn">预览</button>

          <div class="right-title-div">
            <button class="save-btn title-btn">保存到草稿</button>
            <button class="publish-btn title-btn" @click="publish()">发布</button>
          </div>

        </div>
        <div class="editor-main-div">

          <div class="title-input-div">
            <input type="text" class="blog-title-input" placeholder="请输入标题" id="title-input"/>
          </div>


          <div class="editor-div" id="codex-editor" v-html="editorString"></div>
        </div>


        <div class="container">
          <BaseBottomBar></BaseBottomBar>
        </div>
      </div>

      <BaseLive2d></BaseLive2d>


      <div v-if="showSave" class="save-pre-div">
        <div class="show-save-div">
          <div class="save-top-bar">
            <span class="save-title-span">发布博客</span>
            <span class="close-save-span" @click="showSave=false"><i class="fa fa-times-circle-o"
                                                                     aria-hidden="true"></i></span>
          </div>
          <div class="blog-save-menu-div">
            <div class="row menu-row">
              <div class="col-xs-2 col-left">博客分类：</div>
              <div class="col-xs-10 col-right">
                <select class="form-control" id="blog-category">
                  <option v-for="op in bigCategoryList" :key="op.categoryId">
                    {{op.categoryName}}
                  </option>
                </select>
              </div>
            </div>
            <div class="row menu-row">
              <div class="col-xs-2 col-left">博客类型：</div>
              <div class="col-xs-10 col-right">
                <select class="form-control" @change="changeOrigin($event)" id="blog-origin">
                  <option>原创</option>
                  <option>转载</option>
                </select>
              </div>
            </div>
            <div class="row menu-row" v-if="showOriginUrl">
              <div class="col-xs-2 col-left">原文链接：</div>
              <div class="col-xs-10 col-right">
                <input type="text" class="form-control" id="blog-origin-url">
              </div>
            </div>
            <div class="row menu-row">
              <div class="col-xs-2 col-left">文章标签：<!--<p class="tag-intro">单选</p>--></div>
              <div class="col-xs-10 col-right">
                <div class="add-tag">
                  <div v-if="showAddTag">
                    <input type="text" class="form-control add-tag-input" @keyup.enter="addTag($event)">
                    <span class="cancel-tag-input-span" @click="showAddTag = false"><i class="fa fa-times"
                                                                                       aria-hidden="true"></i></span>
                  </div>
                  <span class="add-tag-span" v-if="!showAddTag" @click="showAddTag=true">＋添加新标签</span>
                </div>
                <select class="form-control" id="blog-tag">
                  <option v-for="tag in tagList" :key="tag.tagId">{{tag.tagName}}</option>
                </select>
              </div>
            </div>
            <div class="row menu-row">
              <div class="col-xs-2 col-left">博客集：<p class="tag-intro">(可选)</p></div>
              <div class="col-xs-10 col-right">
                <div v-if="showAddCollection">
                  <input type="text" class="form-control add-tag-input" @keyup.enter="addCollection($event)">
                  <span class="cancel-tag-input-span" @click="showAddCollection = false"><i class="fa fa-times"
                                                                                            aria-hidden="true"></i></span>
                </div>
                <span class="add-collection-span" v-if="!showAddCollection"
                      @click="showAddCollection=true">＋添加新博客集</span>
                <div class="collection-list-div">
                  <div class="row">
                    <div class="collection-item-div col-xs-6" v-for="collection in collectionList"
                         :key="collection.collectionId">
                      <input type="checkbox" :cln="collection.collectionId" class="blog-collection">{{collection.collectionName}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row menu-row">
              <div class="col-xs-2 col-left">是否私密：</div>
              <div class="col-xs-10 col-right">
                <select class="form-control" id="blog-private">
                  <option>公开</option>
                  <option>私密</option>
                </select>
              </div>
            </div>
            <div class="sava-bottom-div">
              <button class="save-btn title-btn" @click="showSave=false">取消</button>
              <button class="view-btn title-btn">保存到草稿</button>
              <button class="publish-btn title-btn" @click="publishBlog()">发布</button>
            </div>

          </div>
        </div>
      </div>


      <!--loading框-->
      <div v-if="showLoading" class="loading-main">
        <BaseLoading class="loading-div"></BaseLoading>
      </div>

      <div class="success-page-div" v-if="showSuccess">
        <div class="success-div">
          <h3>恭喜您！</h3>
          <p>{{showSuccessText}}</p>
          <router-link :to="'/blog/' + blogId" class="common-link">点击查看博客</router-link>
        </div>
      </div>


    </div>
</template>

<script>
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import EditorJS from '@editorjs/editorjs';
    import Header  from '@editorjs/header';
    import LinkTool   from '@editorjs/link';
    import Image   from '@editorjs/image';
    import List from '@editorjs/list';
    import Embed from '@editorjs/embed';
    import Code from '@editorjs/code';
    import Paragraph from '@editorjs/paragraph';
    import Marker from '@editorjs/marker';
    import Delimiter from '@editorjs/delimiter';
    import Table from '@editorjs/table';
    import InlineCode from '@editorjs/inline-code';
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import BaseTopBar from "../../components/bases/BaseTopBar";

    export default {
      name: "EditBlog",
      created() {
        // 初始化登录
        var id = sessionStorage.getItem('userId');
        if (id != null) {
          this.userId = id;
        } else {
          sessionStorage.clear();
          alert("请先登录");
          this.$router.push({
            path: '/',
            query: {
              isLogin: false,
              showLogin: true
            }
          });
          return;
        }

        // 初始化数据
        this.$http.post('http://127.0.0.1:8080/editor/initEditor', {
          userId: id
        }).then((response) => {
          console.log(response)
          if (response.data.state == "false") {
            alert("初始化错误，请稍后重试");
            this.$router.push({
              path: '/',
              query: {
                isLogin: false,
                showLogin: true
              }
            });
          }
          this.bigCategoryList = response.data.bigCategoryList;
          this.collectionList = response.data.blogCollectionList;
          this.tagList = response.data.blogTagList;

        }).catch((exception) => {
          console.log(exception);
          console.log("错误");
          alert("初始化错误，请稍后重试");
          this.$router.push({
            path: '/',
            query: {
              isLogin: false,
              showLogin: true
            }
          });
          return;
        });

      },
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
                /*endpoint: '/codex/editor/fetchUrl'*/
                endpoint: '/server/editor/fetchUrl'
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
            code: Code,
            paragraph: {
              class: Paragraph,
              inlineToolbar: true
            },
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
      components: {BaseTopBar, BaseLive2d, BaseBottomBar},
      data: function() {
        return {
          editorString: '<script src="/static/style/editor.js"><\/script>',
          editorObj: '',  /*用来获取mounted里面定义的editor对象，用来实现save方法*/
          temp: '请输入...',
          userId: 11,
          showSave: false,
          bigCategoryList: [],
          thisCategoryId: 0,
          showAddTag: false,
          showAddCollection: false,
          showLoading: false,
          collectionList: [],
          tagList: [],
          showOriginUrl: false,
          showSuccess: false,
          showSuccessText: '',  /*发布成功时的状态语句，值为诸如：发布成功、待审核*/
          blogId: 0       /*默认为0,0表示为新写的博客，如果不是，则视为修改博客*/
        }
      },
      methods: {
        save: function() {
          this.editorObj.save().then((outputData) => {
            console.log('Article data: ', outputData)
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        },
        publish: function () {
          // 验证是否输入了标题，这只是点击外面的发布按钮做的前序工作，而非真正的发布，这里仅弹出发布前需要填写的一些东西的框，填完了才是正式发布
          var titleInput = $('#title-input');
          if (titleInput.val().trim() == '') {
            alert("请输入标题后重试");
            return;
          }
          // 验证是否登录
          var isLogin = sessionStorage.getItem("isLogin");
          if (isLogin == null || isLogin == 'false' || isLogin == false) {
            alert("请先登录");
            this.$router.push({
              path: '/',
              query: {
                isLogin: false,
                showLogin: true
              }
            });
            return;
          }
          var userId = sessionStorage.getItem("userId");
          this.showSave = true;
        },
        publishBlog: function () {
          this.showLoading = true;
          // 真正的发布
          var userId = this.userId;
          var category = $('#blog-category').val();
          var blogOrigin = $('#blog-origin').val();
          var blogOriginUrl = $('#blog-origin-url').val();
          var blogTag = $('#blog-tag').val();
          var blogPrivate = $('#blog-private').val();

          var collectionListAll = $('.blog-collection');
          // 这个list里存的是id而非名称
          var collectionList = new Array();
          var j = 0;
          for (var i = 0; i < collectionListAll.length; i++) {
            if (collectionListAll[i].checked) {
              collectionList[j++] = collectionListAll[i].getAttribute('cln');
            }
          }
          var blogTitle = $('#title-input').val();
          var blogId = this.blogId;

          this.editorObj.save().then((outputData) => {
            this.$http.post('http://127.0.0.1:8080/editor/publish', {
              userId: userId,
              blogId: blogId,
              categoryName: category,
              blogOrigin: blogOrigin,
              blogOriginUrl: blogOriginUrl,
              blogTagName: blogTag,
              blogPrivate: blogPrivate,
              collectionList: collectionList,
              blogTitle: blogTitle,
              blogContent: outputData
            }).then((response) => {
              console.log("返回");
              console.log(response);

              if (response.data.state == false || response.data.state == 'false') {
                // 发布失败
                alert("发布失败，请重试");
                this.showLoading = false;
                return;
              } else {
                // 发布成功！
                this.blogId = response.data.blogId;
                this.showSuccessText = response.data.result;
                this.showLoading = false;
                this.showSuccess = true;
              }
            }).catch((exception) => {
              console.log(exception);
              alert("发布失败，请重试");
              this.showLoading = false;
              return;
            });

          }).catch((error) => {
            alert("发布失败，请重试");
            this.showLoading = false;
            return;
          });

        },
        goback: function () {
          window.history.back(-1);
        },
        addTag: function (event) {
          this.showLoading = true;
          var obj = event.currentTarget;
          var value = obj.value;
          if (value.trim() == '') {
            alert("请输入标签");
            obj.value = '';
            this.showLoading = false;
            return;
          }

          var userId = this.userId;
          // 已经有了
          this.$http.post('http://127.0.0.1:8080/editor/addTag', {
            userId: userId,
            tagName: value
          }).then((response) => {
            if (response.data.state == 'false') {
              alert(response.data.error);
            } else {
              // 添加成功
              var tagId = response.data.tagId;
              var tagName = value;
              this.tagList.push({tagId: tagId, tagName: tagName});
              this.showAddTag = false;
            }
            obj.value = ''
            this.showLoading = false;
          }).catch((exception) => {
            alert("标签添加失败，请重试");
            this.showLoading = false;
          });
        },
        addCollection: function (event) {
          this.showLoading = true;
          var obj = event.currentTarget;
          var value = obj.value;
          if (value.trim() == '') {
            obj.value = '';
            alert("请输入博客集名称");
            this.showLoading = false;
            return;
          }
          var userId = this.userId;
          // 向服务器请求新增博客集
          this.$http.post('http://127.0.0.1:8080/editor/addCollection', {
            userId: userId,
            collectionName: value
          }).then((response) => {
            if (response.data.state == 'false') {
              alert(response.data.error);
            } else {
              // 添加成功
              var collectionId = response.data.collectionId;
              var collectionName = value;
              this.collectionList.push({collectionId: collectionId, collectionName: collectionName});
              this.showAddCollection = false;
            }
            obj.value = '';
            this.showLoading = false;
          }).catch((exception) => {
            alert("标签添加失败，请重试");
            this.showLoading = false;
          });
        },
        changeOrigin: function (event) {
          var sel = event.currentTarget.value;
          if (sel == '转载') {
            this.showOriginUrl = true;
          } else {
            this.showOriginUrl = false;
          }
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
    outline: none;
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

  .save-pre-div {
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    z-index: 20;
    width: 100%;
    height: 100%;
  }

  .show-save-div {
    background: #fff;
    border-radius: 10px;
    width: 650px;
    max-height: 80%;
    overflow-y: auto;
    padding: 20px 25px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .save-title-span {
    font-weight: 600;
    font-size: 1.25em;
  }

  .close-save-span {
    float: right;
    font-weight: 600;
    cursor: pointer;
    font-size: 1.8em;
    transition: all 0.3s ease-in-out;
    margin-top: -5px;
  }

  .close-save-span:hover {
    color: #F1562A;
  }

  .blog-save-menu-div {
    margin-top: 20px;
  }

  .col-left {
    line-height: 2.2em;
  }

  .menu-row {
    margin-bottom: 15px;
  }

  .add-tag {
    line-height: 2.2em;
    margin-bottom: 10px;
  }

  .add-tag-span {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: 500;
  }

  .add-tag-span:hover {
    color: #F1562A;
  }

  .add-tag-input {
    width: 40%;
    display: inline-block;
  }

  .cancel-tag-input-span {
    margin-left: 5px;
    cursor: pointer;
    color: #999;
    transition: all 0.3s ease-in-out;
  }

  .cancel-tag-input-span:hover {
    color: #555;
  }

  .tag-intro {
    color: #999;
    text-align: left;
    margin-top: -8px;
    padding: 0;
  }

  .add-collection-span {
    line-height: 2.2em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: 500;
  }

  .add-collection-span:hover {
    color: #F1562A;
  }

  .collection-list-div {
    padding: 8px 10px;
    background: #eee;
    border-radius: 5px;
    margin-top: 20px;
    max-height: 320px;
  }

  .sava-bottom-div {
    text-align: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .loading-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .loading-main {
    position: fixed;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    top: 0;

  }


  .success-page-div {
    z-index: 120;
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .success-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    border-radius: 20px;
    width: 400px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    outline: none;
    overflow-y: auto;
    padding: 20px;
    text-align: center;
  }
</style>


