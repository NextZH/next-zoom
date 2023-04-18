// eslint-disable-next-line prettier/prettier

import html2canvas from 'html2canvas';
import { ElLoading } from 'element-plus';

// 打印类属性、方法定义
/* eslint-disable */
const Print = function(dom, options) {
  if (!(this instanceof Print)) return new Print(dom, options);

  this.options = this.extend(
    {
      noPrint: '.no-print',
    },
    options
  );

  if (typeof dom === 'string') {
    this.cloneDom = document.querySelector(dom);
  } else {
    this.isDOM(dom);
    this.cloneDom = this.isDOM(dom) ? dom : dom.$el;
  }
  if (options) {
    let loadingInstance = ElLoading.service({});
    // console.log('多个打印', options);
    // 多个打印
    let list = this.cloneDom.childNodes;
    this.dom = '';
    let promList = [];
    for (var i = 0; i < list.length; i++) {
      let url = html2canvas(list[i], {
        scale: 8, //按比例增加分辨率 (2=双倍).
        dpi: window.devicePixelRatio * 8, //设备像素比
      }).then(canvas => {
        this.imgmap = canvas.toDataURL();
        this.dom += `<div style='width:100%;height:100vh;display:flex;justify-content:center;align-items:center;margin:auto;'>
                        <img style='width:100%;height:auto;margin:auto;page-break-after: always !important;
                        page-break-inside: avoid !important;' src='${this.imgmap}'/>
                    </div>`;
      });
      promList.push(url);
    }
    Promise.all(promList).then(() => {
      this.init();
      loadingInstance.close();
    });
  } else {
    html2canvas(this.cloneDom, {
      scale: 8, //按比例增加分辨率 (2=双倍).
      dpi: window.devicePixelRatio * 8, //设备像素比
    }).then(canvas => {
      this.imgmap = canvas.toDataURL();
      setTimeout(() => {
        this.dom = `<div style='width:100%;height:100%;display:flex;justify-content:center;align-items:center;margin:auto;'>
        <img style='width:100%;height:auto;margin:auto;page-break-after: always !important;
        page-break-inside: avoid !important;' src='${this.imgmap}'/>
        </div>`;
        this.init();
      });
    });
  }
};
Print.prototype = {
  init: function() {
    var content = this.dom;
    this.writeIframe(content);
  },
  extend: function(obj, obj2) {
    for (var k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  },

  writeIframe: function(content) {
    var w,
      doc,
      iframe = document.createElement('iframe'),
      f = document.body.appendChild(iframe);
    iframe.id = 'myIframe';
    //iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
    // iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
    iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:0;left:0;');
    w = f.contentWindow || f.contentDocument;
    doc = f.contentDocument || f.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
    var _this = this;
    var d = doc.firstElementChild;
    d.setAttribute('style', 'margin:0');
    d.lastElementChild.setAttribute('style', 'margin:0;padding:0 8px');
    console.log(d.lastElementChild);
    iframe.onload = function() {
      _this.toPrint(w);
      setTimeout(function() {
        document.body.removeChild(iframe);
      }, 100);
    };
  },

  toPrint: function(frameWindow) {
    try {
      setTimeout(function() {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand('print', false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.log('err', err);
    }
  },
  isDOM:
    typeof HTMLElement === 'object'
      ? function(obj) {
          return obj instanceof HTMLElement;
        }
      : function(obj) {
          return (
            obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
          );
        },
};
const MyPlugin = {};
MyPlugin.install = function(Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$print = Print;
};
// export default MyPlugin;//vue2使用，通过Vue.use()传入插件使用
export default Print;//vue3使用，在相关页面引入即可
