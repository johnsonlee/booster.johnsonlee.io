import{r as o,o as r,c as l,a as n,b as s,d as e,w as i,F as c,e as a}from"./app.9958f85a.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const m={},d=a('<h1 id="zip-file-compression" tabindex="-1"><a class="header-anchor" href="#zip-file-compression" aria-hidden="true">#</a> ZIP File Compression</h1><h2 id="the-ap-file" tabindex="-1"><a class="header-anchor" href="#the-ap-file" aria-hidden="true">#</a> The AP_ File</h2><p>\u5728 <em>Android</em> \u7684\u6784\u5EFA\u6D41\u7A0B\u4E2D\uFF0C\u771F\u6B63\u5C06 <em>dex</em>, <em>resources</em>, <em>assets</em>, <em>so</em> \u7B49\u6587\u4EF6\u5408\u5E76\u6210 <em>APK</em> \u7684\u5DE5\u4F5C\u662F\u5728 <em>package Task</em> \u91CC\u5B8C\u7684\uFF0C\u800C\u5728 <em>APK</em> \u751F\u6210\u4E4B\u524D\uFF0C\u5176\u5B9E\u5DF2\u7ECF\u6709\u4E86\u539F\u578B\u2014\u2014 <em>AP_</em> \u6587\u4EF6\uFF0C\u4E5F\u5C31\u662F <em>processRes Task</em> \u7684\u4EA7\u7269\uFF0C\u91CC\u9762\u7684\u5185\u5BB9\u5305\u62EC\uFF1A</p><ol><li><code>AndroidManifest.xml</code></li><li><code>res/*</code></li><li><code>resources.arsc</code></li></ol>',4),b=n("code",null,"res/*",-1),h=n("code",null,"resources.arsc",-1),_=n("code",null,"res/*",-1),k=n("code",null,"file",-1),g=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">file</span> ./build/intermediates/processed_res/debug/out/resources-debug.ap_
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u5F97\u5230\u5982\u4E0B\u8F93\u51FA\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>./build/intermediates/processed_res/debug/out/resources-debug.ap_: Zip archive data
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u539F\u6765 <em>AP_</em> \u6587\u4EF6\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u7684 <em>ZIP</em> \u6587\u4EF6\uFF0C\u901A\u8FC7 <code>unzip</code> \u547D\u4EE4\u67E5\u770B\u8BE5\u6587\u4EF6\u5185\u5BB9\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">unzip</span> <span class="token parameter variable">-lv</span> ./build/intermediates/processed_res/debug/out/resources-debug.ap_
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u5F97\u5230\u5982\u4E0B\u8F93\u51FA\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Archive:  ./build/intermediates/processed_res/debug/out/resources-debug.ap_
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
    2240  Defl:N      816  64% 01-01-1980 08:00 ad4de798  AndroidManifest.xml
     388  Defl:N      217  44% 01-01-1980 08:00 1d501a5f  res/anim/abc_fade_in.xml
     388  Defl:N      218  44% 01-01-1980 08:00 0bab7627  res/anim/abc_fade_out.xml
     852  Defl:N      376  56% 01-01-1980 08:00 6225a06b  res/anim/abc_grow_fade_in_from_bottom.xml
     508  Defl:N      258  49% 01-01-1980 08:00 41a0b5fb  res/anim/abc_popup_enter.xml
     508  Defl:N      260  49% 01-01-1980 08:00 aa2f234a  res/anim/abc_popup_exit.xml
     852  Defl:N      376  56% 01-01-1980 08:00 687167d1  res/anim/abc_shrink_fade_out_from_bottom.xml
     396  Defl:N      228  42% 01-01-1980 08:00 505f4409  res/anim/abc_slide_in_bottom.xml
     396  Defl:N      229  42% 01-01-1980 08:00 62c18818  res/anim/abc_slide_in_top.xml
     396  Defl:N      227  43% 01-01-1980 08:00 7280bebd  res/anim/abc_slide_out_bottom.xml
     396  Defl:N      228  42% 01-01-1980 08:00 6c5848d3  res/anim/abc_slide_out_top.xml
     388  Defl:N      217  44% 01-01-1980 08:00 a5fe5082  res/anim/abc_tooltip_enter.xml
     388  Defl:N      217  44% 01-01-1980 08:00 82fd0cc5  res/anim/abc_tooltip_exit.xml

     ......

    2060  Stored     2060   0% 01-01-1980 08:00 1d1cb314  res/mipmap-mdpi-v4/ic_launcher.png
    2783  Stored     2783   0% 01-01-1980 08:00 c64dbd08  res/mipmap-mdpi-v4/ic_launcher_round.png
    2963  Stored     2963   0% 01-01-1980 08:00 78bc849d  res/mipmap-hdpi-v4/ic_launcher.png
    4905  Stored     4905   0% 01-01-1980 08:00 ac8a9f01  res/mipmap-hdpi-v4/ic_launcher_round.png
    4490  Stored     4490   0% 01-01-1980 08:00 bd833a1f  res/mipmap-xhdpi-v4/ic_launcher.png
    6895  Stored     6895   0% 01-01-1980 08:00 56433f6e  res/mipmap-xhdpi-v4/ic_launcher_round.png
    6387  Stored     6387   0% 01-01-1980 08:00 ef9c5596  res/mipmap-xxhdpi-v4/ic_launcher.png
   10413  Stored    10413   0% 01-01-1980 08:00 32b2e261  res/mipmap-xxhdpi-v4/ic_launcher_round.png
    9128  Stored     9128   0% 01-01-1980 08:00 84b40e39  res/mipmap-xxxhdpi-v4/ic_launcher.png
   15132  Stored    15132   0% 01-01-1980 08:00 d8318666  res/mipmap-xxxhdpi-v4/ic_launcher_round.png
     448  Defl:N      222  50% 01-01-1980 08:00 f568abe3  res/mipmap-anydpi-v26/ic_launcher.xml
     448  Defl:N      222  50% 01-01-1980 08:00 f568abe3  res/mipmap-anydpi-v26/ic_launcher_round.xml
  260132  Stored   260132   0% 01-01-1980 08:00 ab649898  resources.arsc
--------          -------  ---                            -------
  609517           510626  16%                            440 files
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div>`,7),f=n("em",null,"Method",-1),x=n("em",null,"ZIP",-1),v=n("em",null,"JDK References",-1),y={href:"https://docs.oracle.com/javase/8/docs/api/java/util/zip/ZipEntry.html#setMethod-int-",target:"_blank",rel:"noopener noreferrer"},D=a(`<table><thead><tr><th style="text-align:left;">setMethod</th></tr></thead><tbody><tr><td style="text-align:left;"><code>public void setMethod(int method)</code><br><br>Sets the compression method for the entry.<br><br><strong>Parameters:</strong> <br><em>method - the compression method, either <code>STORED</code> or <code>DEFLATED</code></em><br> <strong>Throws:</strong><br> <em>IllegalArgumentException - if the specified compression method is invalid</em><br></td></tr></tbody></table><p>\u5173\u4E8E <code>STORED</code> \u548C <code>DEFLATED</code> \u7684\u5B9A\u4E49\uFF1A</p><table><thead><tr><th style="text-align:left;">STORED</th></tr></thead><tbody><tr><td style="text-align:left;"><code>public static final int STORED</code> <br><br>Compression method for uncompressed entries.</td></tr></tbody></table><table><thead><tr><th style="text-align:left;">DEFLATED</th></tr></thead><tbody><tr><td style="text-align:left;"><code>public static final int DEFLATED</code> <br><br>Compression method for compressed (deflated) entries.</td></tr></tbody></table><p>\u6240\u4EE5\uFF0C\u91C7\u7528 <em>ZIP</em> \u6253\u5305\u7684\u6587\u4EF6\u4E0D\u4E00\u5B9A\u90FD\u662F\u538B\u7F29\u8FC7\u7684\uFF0C\u4E5F\u6709\u672A\u538B\u7F29\u7684\uFF0C\u8FD9\u4E5F\u5F88\u5BB9\u6613\u7406\u89E3\uFF0C\u50CF\u56FE\u7247\u3001\u97F3\u9891\u3001\u89C6\u9891\u6587\u4EF6\uFF0C\u5DF2\u7ECF\u7F16\u7801\u538B\u7F29\u8FC7\uFF0C\u518D\u7528 <em>ZIP</em> \u538B\u7F29\u4E5F\u6839\u672C\u538B\u7F29\u4E0D\u4E86\u591A\u5C11\uFF0C\u6709\u7684\u53EF\u80FD\u538B\u7F29\u540E\u6BD4\u539F\u6765\u8FD8\u8981\u5927\uFF0C\u6240\u4EE5\uFF0C\u8FD9\u53C8\u4E3A\u6211\u4EEC\u505A\u5305\u4F53\u79EF\u7626\u8EAB\u6253\u5F00\u4E86\u53E6\u4E00\u6247\u5927\u95E8\u3002</p><h2 id="the-solution" tabindex="-1"><a class="header-anchor" href="#the-solution" aria-hidden="true">#</a> The Solution</h2><p>\u65E2\u7136 <em>AP_</em> \u6587\u4EF6\u662F <em>processRes Task</em> \u7684\u4EA7\u7269\uFF0C\u90A3\u6211\u4EEC\u76F4\u63A5\u5728 <em>processRes Task</em> \u4EFB\u52A1\u5B8C\u6210\u4E4B\u540E\u5BF9 <em>AP_</em> \u6587\u4EF6\u8FDB\u884C\u91CD\u65B0\u538B\u7F29\uFF0C\u903B\u8F91\u7B80\u5355\u660E\u4E86\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>VariantProcessor<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> ProcessedResourcesCompressionVariantProcessor <span class="token operator">:</span> VariantProcessor <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">process</span><span class="token punctuation">(</span>variant<span class="token operator">:</span> BaseVariant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> results <span class="token operator">=</span> <span class="token function">CompressionResults</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        variant<span class="token punctuation">.</span>processResTask<span class="token punctuation">.</span><span class="token function">doLast</span> <span class="token punctuation">{</span>
            variant<span class="token punctuation">.</span><span class="token function">compressProcessedRes</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span>
            variant<span class="token punctuation">.</span><span class="token function">generateReport</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h2>`,9),A=n("em",null,"ZIP",-1),P={href:"https://github.com/didi/booster/blob/master/booster-task-compression-processed-res",target:"_blank",rel:"noopener noreferrer"},N=a(`<div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.5.31&quot;</span></span>
        booster_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.16.3&quot;</span></span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/public/&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/snapshots/&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        classpath <span class="token string">&#39;com.android.tools.build:gradle:3.5.0&#39;</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>

        <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} \u5F15\u7528\u8FD9\u4E2A\u6A21\u5757 \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-task-compression-processed-res:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="_7-zip-compression" tabindex="-1"><a class="header-anchor" href="#_7-zip-compression" aria-hidden="true">#</a> <em>7-zip</em> Compression</h2>`,2),S={href:"https://www.7-zip.org/",target:"_blank",rel:"noopener noreferrer"},R=n("em",null,"ZIP",-1),T=n("em",null,"7-zip",-1),E=n("em",null,"LZMA",-1),z=n("em",null,"LZMA2",-1),C={href:"https://github.com/shwenzhang/AndResGuard",target:"_blank",rel:"noopener noreferrer"},w=n("em",null,"7-zip",-1),L=n("em",null,"Google Play",-1),I=a('<h2 id="is-it-really-necessary-to-compress-arsc-or-so" tabindex="-1"><a class="header-anchor" href="#is-it-really-necessary-to-compress-arsc-or-so" aria-hidden="true">#</a> Is It Really Necessary to Compress <em>arsc</em> or <em>so</em>\uFF1F</h2><p>\u4ECE\u6280\u672F\u89D2\u5EA6\u6765\u8BF4\uFF0C<em>Google</em> \u5B98\u65B9\u5E76\u4E0D\u63A8\u8350\u5BF9 <em>resources.arsc</em> \u548C <em>so</em> \u8FDB\u884C\u538B\u7F29\uFF0C\u8FD9\u6837\u4F1A\u5BFC\u81F4\u5B83\u4EEC\u4E0D\u80FD\u88AB\u76F4\u63A5 <em>mmap</em> \u5230\u5185\u5B58\uFF0C\u4F46\u5982\u679C\u4ECE\u4E1A\u52A1\u89D2\u5EA6\u6765\u770B\uFF0C\u5982\u679C <em>APK</em> \u7684\u5927\u5C0F\u6210\u4E3A\u4E86\u963B\u788D\u7528\u6237\u589E\u957F\u7684\u4E00\u4E2A\u56E0\u7D20\uFF0C\u800C\u901A\u8FC7\u538B\u7F29 <em>resources.arsc</em> \u548C <em>so</em> \u5BF9\u7528\u6237\u589E\u957F\u6709\u663E\u8457\u7684\u6B63\u5411\u6536\u76CA\uFF0C\u4F55\u5C1D\u4E0D\u53EF\u5462\uFF1F</p>',2);function Z(q,M){const p=o("RouterLink"),t=o("ExternalLinkIcon");return r(),l(c,null,[d,n("p",null,[s("\u5176\u4E2D "),b,s(" \u662F\u5408\u5E76\u540E\u7684\u6240\u6709\u8D44\u6E90\uFF0C"),h,s(" \u5219\u662F "),_,s(" \u7684\u7D22\u5F15\u8868\uFF08\u8BE6\u89C1\uFF1A"),e(p,{to:"/en/guide/agp/resource-table.html"},{default:i(()=>[s("Resource Table \u6982\u8FF0")]),_:1}),s("\uFF09\uFF0C\u901A\u8FC7 "),k,s(" \u547D\u4EE4\u67E5\u770B\u4E00\u4E0B\u6587\u4EF6\u683C\u5F0F\uFF1A")]),g,n("p",null,[s("\u5176\u4E2D\uFF0C\u7B2C 2 \u5217 "),f,s(" \u5C31\u662F\u5B58\u5165 "),x,s(" \u6587\u4EF6\u4E2D\u91C7\u7528\u7684\u538B\u7F29\u65B9\u6CD5\uFF0C\u53C2\u8003 "),v,s(" \u4E2D "),n("a",y,[s("ZipEntry.setMethod(int)"),e(t)]),s("\uFF1A")]),D,n("p",null,[s("\u5F00\u542F "),A,s(" \u538B\u7F29\u53EA\u9700\u8981\u5F15\u5165 "),n("a",P,[s("booster-task-compression-processed-res"),e(t)]),s(" \u5373\u53EF\uFF0C\u5982\u4E0B\u6240\u793A\uFF1A")]),N,n("p",null,[n("a",S,[s("7-zip"),e(t)]),s(" \u4E0E "),R,s(" \u538B\u7F29\u7684\u539F\u7406\u76F8\u540C\uFF0C\u53EA\u4E0D\u8FC7 "),T,s(" \u91C7\u7528\u4E86\u538B\u7F29\u7387\u66F4\u9AD8\u7684 "),E,s(" \u548C "),z,s(" \u7B97\u6CD5\uFF0C\u7626\u8EAB\u6548\u679C\u66F4\u4F73\uFF0C\u63A8\u8350\u4F7F\u7528 "),n("a",C,[s("AndResguard"),e(t)]),s("\uFF0C\u867D\u7136 "),w,s(" \u7684\u538B\u7F29\u6548\u679C\u975E\u5E38\u663E\u8457\uFF0C\u4F46\u662F\u4F1A\u5B58\u5728\u4E00\u4E9B\u526F\u4F5C\u7528\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4 "),L,s(" \u7684\u4F18\u5316\u7B97\u6CD5\u5931\u6548\u3002")]),I],64)}var $=u(m,[["render",Z]]);export{$ as default};