document.write(`
<script src="https://wanshi1024.github.io/ws_lib/js_util/jquery.min.js">
</script>
<script src="https://wanshi1024.github.io/ws_lib/js_util/vue.min.js"></script>
<style>
    body {
        background: #DFE6C7;
    }
    
    .show-cout {
        padding-bottom: 20px;
        font-size: 14px;
        color: #606266;
        overflow: hidden;
        border-top: 1px solid #ebeef5;
        font-weight: 700;
        padding: 15px;
    }
    /*top*/
    
    .top {
        background-color: #dcdfe6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #dfe1e6;
    }
    
    .top ._3 p:last-child {
        color: red;
    }
    /*middle*/
    
    .middle {
        display: flex;
        justify-content: start;
    }
    
    .middle ._1 {
        background: white;
        cursor: pointer;
    }
    
    .middle ._2 {
        margin-left: 5em;
    }
    /*buttom*/
    
    .bottom {
        display: flex;
        flex-wrap: wrap;
    }
    
    .bottom img {
        width: 150px;
        height: 100px;
        margin: 0 10px;
        border: #dcdfe6 1px solid;
    }
    
    .find {
        position: fixed;
        top: 20%;
        right: 0;
    }
    
    .find>div {
        width: 70px;
        height: 50px;
        background: #19be6b;
        line-height: 50px;
        color: white;
        margin-top: 10px;
        cursor: pointer;
        text-align: center;
    }
    
    .tip {
        text-align: center;
    }
</style>
<div id="app_wanshi">
    <div class="tip" v-if="shouConts.length == 0">无数据,请点击查询</div>
    <div class="show-cout" v-if="shouConts.length>0" v-for="showCont in shouConts">
        <div class="top">
            <div class="_1">
                {{showCont.carInfo.carBaseInfos.carYear}}款 {{showCont.carInfo.carBaseInfos.carName}}
            </div>
            <div class="_2">{{showCont.carInfo.serialName}}</div>
            <div class="_3">
                <p>{{showCont.user.showname}}({{showCont.user.uid}})</p>
                <p>账号等级{{showCont.topicInfo.level}}</p>
            </div>
            <!-- isDigest 0未加精 1 已加精 -->
            <span v-if="showCont.topicInfo.deleteStatus==0">已删除</span>
            <span v-else-if="showCont.topicInfo.isDigest==1">已加精</span>
            <span v-else-if="showCont.topicInfo.deleteStatus==1">待操作</span>
        </div>
        <div class="middle">
            <div class="_1" @click="copyId(showCont.topicInfo.id)">
                点评ID: {{showCont.topicInfo.id}}
            </div>
            <div class="_2">
                发表时间:{{showCont.topicInfo.createTime}}
            </div>
        </div>
        <div class="bottom">
            <!-- http://image.bitautoimg.com/koubei/pics/2020/12/17/9a9407b8b20b4fc886650f83cc6c5d51-w1234-h925.jpg -->
            <img v-for="src in showCont.topicInfo.picList.split(',')" :src="imgBaseURL + src" alt="">
            <!-- <p v-for="src in showCont.topicInfo.picList.split(',')"> {{src}}</p> -->
        </div>
    </div>

    <div class="find">
        <div class="findAll" @click="findAll">
            查询全部
        </div>
        <div class="findJiaJing" @click="findJiaJing">
            查询加精
        </div>
        <div class="returnTop" @click="returnTop">
            返回顶部
        </div>
    </div>
</div>

<script>
    const BaseURL = 'http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition'
    new Vue({
        el: '#app_wanshi',
        data() {
            return {
                shouConts: [],
                imgBaseURL: 'http://image.bitautoimg.com/koubei/pics/'
            }
        },
        created() {
            // deleteStatus: 0 已删  1未删
            // topicType: 0 普通 1 加精
            // this.getShowConts(144202)
        },

        methods: {
            getShowConts(serialId, trimId, topicType) {
                let url = BaseURL + '?serialId=' + serialId + '&trimId=' + trimId + '&pageSize=20&isHavePic=1'
                if (topicType != undefined || topicType != null) {
                    url += "&topicType=" + topicType
                }
                $.get(url, res => this.shouConts = res.data.result)
            },
            findAll() {
                let serialId = localStorage.getItem('serialId');
                let trimId = localStorage.getItem('trimId')
                this.getShowConts(serialId, trimId)
            },
            findJiaJing() {
                let serialId = localStorage.getItem('serialId');
                let trimId = localStorage.getItem('trimId')
                this.getShowConts(serialId, trimId, 1)
            },
            copyId(id) {
                copy(id)
            },
            returnTop() {
                scrollTo(0, 0);
            }
        },

    })

    function copy(value) {
        console.log(value);
        var currentFocus = document.activeElement;
        let input = document.createElement('input');
        document.body.appendChild(input);
        input.style.opacity = 0;
        input.value = value;
        let scrollY = window.scrollY;
        input.focus();
        input.setSelectionRange(0, input.value.length);
        var res = document.execCommand('copy', true);
        currentFocus.focus();
        document.body.removeChild(input);
        window.scrollTo(0, scrollY);
        promptBox('复制成功')
        return res;
    }

    function promptBox(str) {
        let pb = document.createElement('div');
        pb.innerHTML = str;
        let cssObj = {
            position: 'fixed',
            left: '50%',
            top: '0%',
            border: '1px solid #EBEEF5',
            padding: '15px 15px 15px 20px',
            background: '#f0f9eb',
            color: '#67C23A',
            opacity: 0,
            transition: 'all 1s'
        };
        for (let key in cssObj) {
            pb.style[key] = cssObj[key];
        }
        pb.id = 'ws';
        document.body.append(pb);
        setTimeout(() => {
            pb.style.top = '10%';
            pb.style.opacity = 1;
            setTimeout(() => {
                pb.remove()
            }, 2000);
        }, 50);

    }
</script>

`)