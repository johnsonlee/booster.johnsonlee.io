import{r as s,o as m,c as l,a,b as e,d as n,F as o,e as t}from"./app.9958f85a.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const d={},c=t(`<h1 id="\u7C7B\u5E93\u6CE8\u5165" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u5E93\u6CE8\u5165" aria-hidden="true">#</a> \u7C7B\u5E93\u6CE8\u5165</h1><h2 id="\u4EC0\u4E48\u662F\u7C7B\u5E93\u6CE8\u5165" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F\u7C7B\u5E93\u6CE8\u5165" aria-hidden="true">#</a> \u4EC0\u4E48\u662F\u7C7B\u5E93\u6CE8\u5165\uFF1F</h2><p>\u901A\u5E38\uFF0C\u6211\u4EEC\u4F1A\u5728 <em>ClassTransformer</em> \u4E2D\u4FEE\u6539\u6216\u8005\u6CE8\u5165\u5B57\u8282\u7801\uFF0C\u5982\u679C\u5728 <em>ClassTransformer</em> \u6CE8\u5165\u7684\u5B57\u8282\u7801\u4F9D\u8D56\u4E8E\u53E6\u4E00\u4E2A\u7C7B\u5E93\uFF08JAR / AAR\uFF09\uFF0C\u6211\u4EEC\u8BE5\u600E\u4E48\u529E\u5462\uFF1F\u529E\u6CD5\u6709\u5F88\u591A\uFF1A</p><ol><li>\u5C06\u7C7B\u5E93\u5185\u7F6E\u5230 <em>resources</em> \u4E2D\uFF0C\u7136\u540E\u5728 <em>ClassTransformer</em> \u4E2D\u5C06\u5176\u62F7\u8D1D\u5230 <em>Transform</em> \u7684\u8F93\u51FA\u76EE\u5F55\u4E2D</li><li>\u4ECE\u8FDC\u7A0B\u4E0B\u8F7D\u5230 <em>Transform</em> \u7684\u8F93\u51FA\u76EE\u5F55\u4E2D</li><li>......</li></ol><p>\u5982\u679C\u8FD9\u4E2A\u7C7B\u5E93\uFF08JAR / AAR\uFF09\u53C8\u4F9D\u8D56\u4E86\u5176\u5B83\u7684\u7C7B\u5E93\uFF08JAR / AAR\uFF09\uFF0C\u90A3\u6211\u4EEC\u8BE5\u600E\u4E48\u529E\u5462\uFF1F\u867D\u7136\u8FD9\u6837\u4F1A\u8BA9\u4E8B\u60C5\u53D8\u5F97\u5F88\u590D\u6742\uFF0C\u4E5F\u4E0D\u662F\u6CA1\u6709\u529E\u6CD5\uFF0C\u53EF\u4EE5\u628A <em>Maven</em> \u6216\u8005 <em>Ivy</em> \u7B49\u4F9D\u8D56\u7BA1\u7406\u5DE5\u5177\u7684\u7C7B\u5E93\u96C6\u6210\u8FDB\u6765\u3002</p><p>\u5982\u679C\u4F20\u9012\u4F9D\u8D56\u7684\u7C7B\u5E93\u5728 <em>APP</em> \u4E2D\u5DF2\u7ECF\u5B58\u5728\uFF0C\u800C\u4E14\u8DDF <em>APP</em> \u4F9D\u8D56\u7684\u7C7B\u5E93\u7248\u672C\u4E0D\u4E00\u81F4\uFF0C\u90A3\u6211\u4EEC\u8BE5\u600E\u4E48\u529E\u5462\uFF1F\u5982\u679C\u662F\u8FD9\u6837\u7684\u8BDD\uFF0C\u524D\u9762\u7684\u65B9\u6CD5\u5C31\u4E0D\u592A\u5BB9\u6613\u5B9E\u73B0\u4E86\uFF0C\u6709\u6CA1\u6709\u66F4\u7B80\u5355\u7684\u529E\u6CD5\u5462\uFF1F\u5F53\u7136\u6709\uFF0C\u8FD9\u5C31\u662F\u8BBE\u8BA1 <em>VariantProcessor</em> \u7684\u521D\u8877\uFF0C\u8BA9\u5927\u89C4\u6A21\u7684\u5B57\u8282\u7801\u6CE8\u5165\u53D8\u5F97\u66F4\u5BB9\u6613\u3002</p><h2 id="\u5982\u4F55\u6CE8\u5165\u7C7B\u5E93" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u6CE8\u5165\u7C7B\u5E93" aria-hidden="true">#</a> \u5982\u4F55\u6CE8\u5165\u7C7B\u5E93\uFF1F</h2><p>\u9996\u5148\uFF0C\u6211\u4EEC\u6765\u56DE\u987E\u4E00\u4E0B <em>ClassTransformer</em> \u4E0E <em>VariantProcessor</em> \u5404\u81EA\u7684\u804C\u8D23\uFF1A</p><ul><li><em>ClassTransformer</em> \u4E3B\u8981\u7528\u4E8E\u64CD\u4F5C\u5B57\u8282\u7801\uFF0C\u9664\u4E86\u5B57\u8282\u7801\u4EE5\u5916\u7684\u5185\u5BB9\uFF0C<em>ClassTransformer</em> \u662F\u4E0D\u592A\u5BB9\u6613\u64CD\u4F5C\u7684\uFF0C\u6BD4\u5982\uFF1A\u8D44\u6E90\u3001\u521B\u5EFA <em>Task</em> \u7B49</li><li><em>VariantProcessor</em> \u4E3B\u8981\u8D1F\u8D23\u9664\u64CD\u4F5C\u5B57\u8282\u7801\u4EE5\u5916\u7684\u5176\u5B83\u5DE5\u4F5C\uFF0C\u6BD4\u5982\uFF1A\u521B\u5EFA <em>Task</em>\uFF0C\u8BBF\u95EE\u6784\u5EFA\u4E2D\u95F4\u4EA7\u7269\uFF0C\u7B49\u7B49\u3002</li></ul><p>\u4E3A\u4EC0\u4E48\u8981\u8FD9\u4E48\u8BBE\u8BA1\u5462\uFF1F\u4E3B\u8981\u662F\u4E24\u65B9\u9762\u7684\u8003\u8651\uFF1A</p><ol><li>\u5206\u5DE5\u66F4\u660E\u786E</li><li>\u5C06 <em>ClassTransformer</em> \u4E0E <em>Gradle API</em> \u89E3\u8026</li></ol><p>\u4E00\u65B9\u9762\uFF0C\u4FBF\u4E8E\u5355\u5143\u6D4B\u8BD5\uFF0C\u53E6\u4E00\u65B9\u9762\uFF0C\u53EF\u4EE5\u5728\u975E <em>Gradle</em> \u5DE5\u7A0B\u4E2D\u590D\u7528 <em>ClassTransformer</em></p><h2 id="\u52A8\u624B\u5B9E\u8DF5" tabindex="-1"><a class="header-anchor" href="#\u52A8\u624B\u5B9E\u8DF5" aria-hidden="true">#</a> \u52A8\u624B\u5B9E\u8DF5</h2><p>\u76F8\u4FE1\u5F88\u591A <em>Android</em> \u5F00\u53D1\u8005\u6709\u9047\u5230\u52A8\u6001\u5E93\u52A0\u8F7D\u5931\u8D25\u7684\u60C5\u51B5\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>java.lang.UnsatisfiedLinkError: Couldn&#39;t load xxx from loader dalvik.system.PathClassLoader: findLibrary returned null
  at java.lang.Runtime.loadLibrary(Runtime.java:365)
  at java.lang.System.loadLibrary(System.java:535)
  at com.your.app.NativeClass.&lt;clinit&gt;(Native.java:16)
  ... 63 more
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,15),p={href:"https://github.com/KeepSafe/ReLinker",target:"_blank",rel:"noopener noreferrer"},h=a("em",null,"Booster",-1),u={href:"https://github.com/KeepSafe/ReLinker",target:"_blank",rel:"noopener noreferrer"};function f(b,_){const r=s("ExternalLinkIcon");return m(),l(o,null,[c,a("p",null,[e("\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 "),a("a",p,[e("ReLinker"),n(r)]),e(" \u6765\u907F\u514D\u8FD9\u79CD\u5D29\u6E83\u7684\u53D1\u751F\uFF0C\u5982\u4F55\u4F7F\u7528 "),h,e(" \u6765\u5B8C\u6210\u5BF9 "),a("a",u,[e("ReLinker"),n(r)]),e(" \u7684\u6CE8\u5165\u5462\uFF1F\u8FD9\u4E2A\u95EE\u9898\u5C31\u7559\u7ED9\u672C\u4E66\u7684\u8BFB\u8005\u5427\u3002")])],64)}var k=i(d,[["render",f]]);export{k as default};
