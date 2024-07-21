import{r as e,o,c as l,a as s,b as n,d as a,w as c,F as i,e as r}from"./app.9958f85a.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const k={},m=r(`<h1 id="\u9009\u62E9\u5B57\u8282\u7801\u64CD\u4F5C\u6846\u67B6" tabindex="-1"><a class="header-anchor" href="#\u9009\u62E9\u5B57\u8282\u7801\u64CD\u4F5C\u6846\u67B6" aria-hidden="true">#</a> \u9009\u62E9\u5B57\u8282\u7801\u64CD\u4F5C\u6846\u67B6</h1><h2 id="asm-vs-javassist" tabindex="-1"><a class="header-anchor" href="#asm-vs-javassist" aria-hidden="true">#</a> ASM vs Javassist</h2><p>\u5F88\u591A\u5F00\u53D1\u8005\u5728\u9009\u62E9\u5B57\u8282\u7801\u64CD\u4F5C\u6846\u67B6\u4E4B\u521D\uFF0C\u90FD\u4F1A\u6709\u6240\u7591\u60D1\uFF0C\u5230\u5E95\u662F\u9009\u62E9 <em>Javassist</em> \u5462\uFF1F\u8FD8\u662F <em>ASM</em> \u5462\uFF1F\u6211\u4EEC\u53EF\u80FD\u4ECE\u4EE5\u4E0B\u51E0\u4E2A\u65B9\u9762\u6765\u5BF9\u6BD4\u4E00\u4E0B\u4E24\u8005\u4E4B\u95F4\u7684\u5DEE\u5F02\uFF0C\u4EE5\u53CA\u9002\u7528\u8303\u56F4\uFF1A</p><table><thead><tr><th style="text-align:left;">\u7279\u6027</th><th style="text-align:left;">Javassist</th><th style="text-align:left;">ASM</th></tr></thead><tbody><tr><td style="text-align:left;">\u5305\u5927\u5C0F</td><td style="text-align:left;">771 KB (3.27)</td><td style="text-align:left;">265 KB (6.0 BETA)</td></tr><tr><td style="text-align:left;">\u6027\u80FD</td><td style="text-align:left;">\u52A3\u4E8E <em>ASM</em></td><td style="text-align:left;">\u4F18\u4E8E <em>Javassist</em></td></tr><tr><td style="text-align:left;">API \u5C01\u88C5\u7A0B\u5EA6</td><td style="text-align:left;">\u9AD8</td><td style="text-align:left;">\u4F4E</td></tr><tr><td style="text-align:left;">\u529F\u80FD\u5B8C\u5907\u7A0B\u5EA6</td><td style="text-align:left;">\u5B8C\u5907</td><td style="text-align:left;">\u5B8C\u5907</td></tr><tr><td style="text-align:left;">\u5BF9\u5F00\u53D1\u8005\u7684\u8981\u6C42</td><td style="text-align:left;">\u57FA\u672C\u4E86\u89E3 <em>class</em> \u6587\u4EF6\u683C\u5F0F\u548C <em>JVM</em> \u6307\u4EE4\u96C6</td><td style="text-align:left;">\u9700\u8981\u7CBE\u901A <em>class</em> \u6587\u4EF6\u683C\u5F0F\u548C <em>JVM</em> \u6307\u4EE4\u96C6</td></tr><tr><td style="text-align:left;">\u5B66\u4E60\u66F2\u7EBF</td><td style="text-align:left;">\u5E73\u7F13</td><td style="text-align:left;">\u9661\u5CED</td></tr><tr><td style="text-align:left;">\u6587\u6863\u53CA\u624B\u518C</td><td style="text-align:left;">\u7B80\u5355\u660E\u4E86</td><td style="text-align:left;">\u6709\u4E9B\u7E41\u7410\uFF08Vistor \u6A21\u5F0F\u8BA9\u521D\u5B66\u8005\u6709\u70B9\u61F5\uFF09</td></tr></tbody></table><p>\u4ECE\u4E0A\u9762\u7684\u5BF9\u6BD4\u6765\u770B\uFF0C\u6211\u60F3\u5404\u4F4D\u8BFB\u8005\u5DF2\u7ECF\u6709\u6240\u9009\u62E9\uFF0C\u5BF9\u6211\u4E2A\u4EBA\u800C\u8A00\uFF0C\u5982\u679C\u662F\u521D\u5B66\u8005\uFF0C\u5EFA\u8BAE\u9009\u62E9 <em>Javassist</em>\uFF0C\u6BD5\u7ADF\u4E0A\u624B\u5FEB\uFF0C\u5B66\u4E60\u8D77\u6765\u6BD4\u8F83\u5BB9\u6613\uFF0C\u5982\u679C\u662F\u5BF9\u6027\u80FD\u3001\u5305\u4F53\u79EF\u65B9\u9762\u8981\u6C42\u6BD4\u8F83\u9AD8\uFF0C\u5EFA\u8BAE\u9009\u62E9 <em>ASM</em>\u3002</p><p>\u6240\u4EE5\uFF0C\u4E3A\u4E86\u7167\u987E\u5230\u5C3D\u53EF\u80FD\u591A\u7684\u5F00\u53D1\u8005\uFF0C<em>Booster</em> \u5BF9\u4E24\u8005\u90FD\u505A\u4E86\u652F\u6301\uFF0C\u770B\u8FC7 <em>Booster</em> \u7684\u6E90\u7801\u7684\u540C\u5B66\u53EF\u80FD\u4F1A\u95EE\uFF0C\u4E3A\u4EC0\u4E48 <em>Booster</em> \u7684\u5927\u90E8\u5206\u5B9E\u73B0\u90FD\u662F\u57FA\u4E8E <em>ASM</em> \u5462\uFF1F\u7A76\u7ADF\u6709\u54EA\u4E9B\u8003\u91CF\uFF1F</p><h2 id="asm-javassist-\u6027\u80FD\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#asm-javassist-\u6027\u80FD\u6D4B\u8BD5" aria-hidden="true">#</a> ASM &amp; Javassist \u6027\u80FD\u6D4B\u8BD5</h2><p><em>Booster</em> \u6700\u521D\u5728\u9009\u62E9\u5B57\u8282\u7801\u64CD\u4F5C\u6846\u67B6\u7684\u65F6\u5019\uFF0C\u6700\u4E3B\u8981\u7684\u8003\u91CF\u56E0\u7D20\u662F\u6027\u80FD\uFF0C<em>Booster</em> \u4F5C\u4E3A\u8D28\u91CF\u4F18\u5316\u6846\u67B6\uFF0C\u4E0D\u4EC5\u81EA\u8EAB\u6A21\u5757\u5728\u6027\u80FD\u4E0A\u8981\u6C42\u505A\u5230\u6781\u81F4\uFF0C\u4E5F\u8981\u8BA9\u5176\u4ED6\u5F00\u53D1\u8005\u57FA\u4E8E <em>Booster</em> \u5F00\u53D1\u7684\u529F\u80FD\u5728\u6027\u80FD\u4E0A\u4E5F\u8981\u8868\u73B0\u5353\u8D8A\uFF0C\u6240\u4EE5\uFF0C\u9488\u5BF9 <em>Javassist</em> \u548C <em>ASM</em> \u5728\u5B57\u8282\u7801\u5904\u7406\u65B9\u9762\u7684\u6027\u80FD\u4F5C\u4E86 <em>benchmark</em> \u6D4B\u8BD5\uFF0C\u4EE5\u4E0B\u662F\u901A\u8FC7\u5904\u7406 <em>guava-28.2-jre.jar</em> \u6765\u5BF9\u6BD4\u4E8C\u8005\u4E4B\u95F4\u7684\u6027\u80FD\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token annotation builtin">@BenchmarkMode</span><span class="token punctuation">(</span>Mode<span class="token punctuation">.</span>AverageTime<span class="token punctuation">)</span>
<span class="token annotation builtin">@OutputTimeUnit</span><span class="token punctuation">(</span>TimeUnit<span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">)</span>
<span class="token annotation builtin">@Fork</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> jvmArgs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;-Xms2G&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;-Xmx2G&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@State</span><span class="token punctuation">(</span>Scope<span class="token punctuation">.</span>Benchmark<span class="token punctuation">)</span>
<span class="token keyword">open</span> <span class="token keyword">class</span> JavassistVsAsmBenchmark <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">lateinit</span> <span class="token keyword">var</span> file<span class="token operator">:</span> File

    <span class="token annotation builtin">@Setup</span>
    <span class="token keyword">fun</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>file <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">createTempFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;guava-&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;-28.2-jre.jar&quot;</span></span><span class="token punctuation">)</span>
        javaClass<span class="token punctuation">.</span>classLoader<span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;guava-28.2-jre.jar&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span> <span class="token punctuation">{</span> input <span class="token operator">-&gt;</span>
            file<span class="token punctuation">.</span><span class="token function">outputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span> <span class="token punctuation">{</span> output <span class="token operator">-&gt;</span>
                input<span class="token operator">!!</span><span class="token punctuation">.</span><span class="token function">copyTo</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@Benchmark</span>
    <span class="token keyword">fun</span> <span class="token function">transformJarUsingAsm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">TransformHelper</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">,</span> AndroidSdk<span class="token punctuation">.</span><span class="token function">getAndroidJar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>parentFile<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>transformers <span class="token operator">=</span> <span class="token operator">*</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token function">AsmTransformer</span><span class="token punctuation">(</span><span class="token function">AsmThreadTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@Benchmark</span>
    <span class="token keyword">fun</span> <span class="token function">transformJarUsingJavassist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">TransformHelper</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">,</span> AndroidSdk<span class="token punctuation">.</span><span class="token function">getAndroidJar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>parentFile<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>transformers <span class="token operator">=</span> <span class="token operator">*</span><span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token function">JavassistTransformer</span><span class="token punctuation">(</span><span class="token function">JavassistThreadTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@TearDown</span>
    <span class="token keyword">fun</span> <span class="token function">teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><blockquote><p><em>Benchmark</em> \u6D4B\u8BD5\u4EE3\u7801\uFF1Ahttps://github.com/johnsonlee/booster-benchmark</p></blockquote><p><em>Benchmark</em> \u6D4B\u8BD5\u7ED3\u679C\u5982\u4E0B\uFF1A</p><table><thead><tr><th style="text-align:left;">Benchmark</th><th>Mode</th><th>Cnt</th><th>Score</th><th>Error</th><th>Units</th></tr></thead><tbody><tr><td style="text-align:left;">JavassistVsAsmBenchmark.transformJarUsingAsm</td><td>avgt</td><td>10</td><td>203.489</td><td>\xB1 52.174</td><td>ms/op</td></tr><tr><td style="text-align:left;">JavassistVsAsmBenchmark.transformJarUsingJavassist</td><td>avgt</td><td>10</td><td>277.695</td><td>\xB1 10.801</td><td>ms/op</td></tr></tbody></table><p>\u4ECE\u4E0A\u9762\u7684\u7ED3\u679C\u6765\u770B\uFF0C<em>ASM</em> \u5E73\u5747\u8017\u65F6\u66F4\u4F4E</p><h2 id="\u5176\u5B83\u9009\u62E9" tabindex="-1"><a class="header-anchor" href="#\u5176\u5B83\u9009\u62E9" aria-hidden="true">#</a> \u5176\u5B83\u9009\u62E9</h2>`,14),d=s("em",null,"ASM",-1),b=s("em",null,"Javassist",-1),f=s("em",null,"Booster",-1),h={href:"https://commons.apache.org/bcel/",target:"_blank",rel:"noopener noreferrer"},g=s("em",null,"ASM",-1),y=s("em",null,"Javassist",-1),v=s("em",null,"Booster",-1),x={href:"https://commons.apache.org/bcel/",target:"_blank",rel:"noopener noreferrer"};function _(A,B){const t=e("ExternalLinkIcon"),p=e("RouterLink");return o(),l(i,null,[m,s("p",null,[n("\u9664\u4E86 "),d,n(" \u548C "),b,n(" \u4EE5\u5916\uFF0C"),f,n(" \u540C\u6837\u652F\u6301\u4F7F\u7528\u5176\u5B83\u7684\u5B57\u8282\u7801\u6846\u67B6\uFF0C\u6BD4\u5982\uFF1A"),s("a",h,[n("Apache Commons BCEL"),a(t)]),n("\uFF0C\u53EA\u4E0D\u8FC7\uFF0C"),g,n(" \u548C "),y,n(" \u662F "),v,n(" \u9ED8\u8BA4\u63D0\u4F9B\u4E86\u652F\u6301\uFF0C\u5982\u679C\u8981\u5728\u9879\u76EE\u4E2D\u4F7F\u7528 "),s("a",x,[n("Apache Commons BCEL"),a(t)]),n(" \u2014\u2014 \u8BF7\u53C2\u9605"),a(p,{to:"/zh/developer/bytecode-transformer.html#%E8%87%AA%E5%AE%9A%E4%B9%89-transformer"},{default:c(()=>[n("\u5B57\u8282\u7801\u64CD\u4F5C - \u81EA\u5B9A\u4E49 Transformer")]),_:1}),n("\u3002")])],64)}var w=u(k,[["render",_]]);export{w as default};
