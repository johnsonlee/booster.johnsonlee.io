import{r as o,o as r,c as l,e,a,b as s,d as t,F as i}from"./app.621f1d2a.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const u={},b={href:"https://github.com/didi/booster/tree/master/booster-transform-asm",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/didi/booster/tree/master/booster-transform-javassist",target:"_blank",rel:"noopener noreferrer"};function k(d,n){const p=o("ExternalLinkIcon");return r(),l(i,null,[n[14]||(n[14]=e(`<h1 id="first-classtransformer" tabindex="-1"><a class="header-anchor" href="#first-classtransformer" aria-hidden="true">#</a> First ClassTransformer</h1><h2 id="create-project" tabindex="-1"><a class="header-anchor" href="#create-project" aria-hidden="true">#</a> Create Project</h2><p>Before writing your first <em>ClassTransformer</em>, you need a <em>Java</em> or <em>Kotlin</em> project. There are two types of project structures.</p><h3 id="buildsrc-project" tabindex="-1"><a class="header-anchor" href="#buildsrc-project" aria-hidden="true">#</a> buildSrc Project</h3><p>If you already have an <em>Android</em> project, you can create a <em>buildSrc</em> directory directly in the project root directory. <em>Gradle</em> will treat <em>buildSrc</em> as a build project, compile and test it, and then add it to the <em>buildscript</em> <em>classpath</em>. For projects with multiple subprojects, there can only be one <em>buildSrc</em> directory in the project root. For complex builds, using <em>buildSrc</em> to organize build scripts is preferred.</p><p>Then create the following directory structure under the <em>buildSrc</em> directory:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>buildSrc/
\u251C\u2500\u2500 build.gradle
\u2514\u2500\u2500 src
    \u2514\u2500\u2500 main
        \u251C\u2500\u2500 java
        \u2514\u2500\u2500 kotlin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote><p>For <em>Android</em> developers, the <em>buildSrc</em> approach is recommended as it&#39;s easier to get started within a single project.</p></blockquote><h3 id="standalone-java-project" tabindex="-1"><a class="header-anchor" href="#standalone-java-project" aria-hidden="true">#</a> Standalone Java Project</h3><p>If you need to share the <em>ClassTransformer</em> across multiple <em>Android</em> projects, a standalone <em>Java</em> project would be more appropriate.</p><p>We can create a <em>Java</em> project using the <em>gradle</em> command:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> BoosterDemo                 <span class="token comment"># Create BoosterDemo project</span>
$ <span class="token builtin class-name">cd</span> BoosterDemo <span class="token operator">&amp;&amp;</span> gradle init     <span class="token comment"># Initialize project</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Then select the project type:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Starting a Gradle Daemon (subsequent builds will be faster)

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Here, we select <em>3: library</em>. Next, select the language:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Here you can choose according to your preference: <em>Groovy</em> / <em>Java</em> / <em>Kotlin</em> / <em>Scala</em>. Let&#39;s assume we select <em>4: Kotlin</em>:</p><p>Next, select the build script <em>DSL</em>:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Kotlin) [1..2]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>If you&#39;re not familiar with <em>Kotlin DSL</em>, you can select <em>1: Groovy</em>:</p><p>Then, enter the project name, or use the default project name (directory name):</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Project name (default: BoosterDemo):
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Then enter the source code package name:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Source package (default: BoosterDemo): io.johnsonlee.booster.demo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Now, the <em>Java Library</em> project is created.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.
\u251C\u2500\u2500 build.gradle
\u251C\u2500\u2500 gradle
\u2502   \u2514\u2500\u2500 wrapper
\u2502       \u251C\u2500\u2500 gradle-wrapper.jar
\u2502       \u2514\u2500\u2500 gradle-wrapper.properties
\u251C\u2500\u2500 gradlew
\u251C\u2500\u2500 gradlew.bat
\u251C\u2500\u2500 settings.gradle
\u2514\u2500\u2500 src
    \u251C\u2500\u2500 main
    \u2502   \u251C\u2500\u2500 kotlin
    \u2502   \u2502   \u2514\u2500\u2500 io
    \u2502   \u2502       \u2514\u2500\u2500 johnsonlee
    \u2502   \u2502           \u2514\u2500\u2500 booster
    \u2502   \u2502               \u2514\u2500\u2500 Library.kt
    \u2502   \u2514\u2500\u2500 resources
    \u2514\u2500\u2500 test
        \u251C\u2500\u2500 kotlin
        \u2502   \u2514\u2500\u2500 io
        \u2502       \u2514\u2500\u2500 johnsonlee
        \u2502           \u2514\u2500\u2500 booster
        \u2502               \u2514\u2500\u2500 LibraryTest.kt
        \u2514\u2500\u2500 resources
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>If using a standalone <em>Java Library</em> project, you need to publish the <em>Java Library</em> project to a Maven repository before integrating it into an Android project. For example, to publish to the local Maven repository:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./gradlew publishToMavenLocal
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div><h2 id="introducing-booster" tabindex="-1"><a class="header-anchor" href="#introducing-booster" aria-hidden="true">#</a> Introducing Booster</h2><p>After preparing the project, add the <em>Booster</em> dependency in the <em>build.gradle</em> file of the <em>Java Library</em> project or the <em>buildSrc</em> directory of the <em>Android</em> project:</p><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        agp_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.0.0&quot;</span></span>
        booster_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.16.3&quot;</span></span>
        kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.5.31&quot;</span></span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-kapt&#39;</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

sourceSets <span class="token punctuation">{</span>
    main <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        kotlin <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token string">&#39;src/main/kotlin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src/main/java&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    test <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        kotlin <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token string">&#39;src/main/kotlin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src/main/java&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

compileKotlin <span class="token punctuation">{</span>
    kotlinOptions<span class="token punctuation">.</span>jvmTarget <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

compileTestKotlin <span class="token punctuation">{</span>
    kotlinOptions<span class="token punctuation">.</span>jvmTarget <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} Reference these two modules \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h2 id="asm-based-class-transformer" tabindex="-1"><a class="header-anchor" href="#asm-based-class-transformer" aria-hidden="true">#</a> ASM-Based Class Transformer</h2>`,31)),a("p",null,[n[1]||(n[1]=s("The ASM-based ",-1)),n[2]||(n[2]=a("em",null,"ClassTransformer",-1)),n[3]||(n[3]=s(" requires adding the ",-1)),a("a",b,[n[0]||(n[0]=s("booster-transform-asm",-1)),t(p)]),n[4]||(n[4]=s(" dependency in ",-1)),n[5]||(n[5]=a("code",null,"dependencies",-1)),n[6]||(n[6]=s(":",-1))]),n[15]||(n[15]=e(`<div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} Reference these three modules \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-transform-asm:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">package</span> io<span class="token punctuation">.</span>johnsonlee<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>demo

<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>TransformContext
<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>asm<span class="token punctuation">.</span>ClassTransformer
<span class="token keyword">import</span> org<span class="token punctuation">.</span>objectweb<span class="token punctuation">.</span>asm<span class="token punctuation">.</span>tree<span class="token punctuation">.</span>ClassNode
<span class="token keyword">import</span> com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>auto<span class="token punctuation">.</span>service<span class="token punctuation">.</span>AutoService

<span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> FirstClassTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> ClassNode<span class="token punctuation">)</span><span class="token operator">:</span> ClassNode <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Transforming </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">klass<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> klass
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="javassist-based-class-transformer" tabindex="-1"><a class="header-anchor" href="#javassist-based-class-transformer" aria-hidden="true">#</a> Javassist-Based Class Transformer</h2>`,3)),a("p",null,[n[8]||(n[8]=s("The Javassist-based ",-1)),n[9]||(n[9]=a("em",null,"ClassTransformer",-1)),n[10]||(n[10]=s(" requires adding the ",-1)),a("a",m,[n[7]||(n[7]=s("booster-transform-javassist",-1)),t(p)]),n[11]||(n[11]=s(" dependency in ",-1)),n[12]||(n[12]=a("code",null,"dependencies",-1)),n[13]||(n[13]=s(":",-1))]),n[16]||(n[16]=e(`<div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} Reference these three modules \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-transform-javassist:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">package</span> io<span class="token punctuation">.</span>johnsonlee<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>demo

<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>TransformContext
<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>javassist<span class="token punctuation">.</span>ClassTransformer
<span class="token keyword">import</span> com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>auto<span class="token punctuation">.</span>service<span class="token punctuation">.</span>AutoService
<span class="token keyword">import</span> javassist<span class="token punctuation">.</span>CtClass

<span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> FirstClassTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> CtClass<span class="token punctuation">)</span><span class="token operator">:</span> CtClass <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Transforming </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">klass<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> klass
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="configuring-android-project" tabindex="-1"><a class="header-anchor" href="#configuring-android-project" aria-hidden="true">#</a> Configuring Android Project</h2><p>At this point, the first <em>ClassTransformer</em> is basically complete. Next, configure <em>Booster</em> in the <em>build.gradle</em> of the <em>Android</em> project:</p><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        agp_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.0.0&quot;</span></span>
        booster_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.16.3&quot;</span></span>
        kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.5.31&quot;</span></span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>

        <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} Reference Booster Gradle plugin \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

allprojects <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;com.android.application&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-android&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-android-extensions&#39;</span>

<span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} Apply Booster plugin \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;com.didiglobal.booster&#39;</span>

android <span class="token punctuation">{</span>
    compileSdkVersion <span class="token number">28</span>
    buildToolsVersion <span class="token interpolation-string"><span class="token string">&quot;26.0.3&quot;</span></span>
    defaultConfig <span class="token punctuation">{</span>
        applicationId <span class="token string">&#39;io.johnsonlee.booster.demo&#39;</span>
        minSdkVersion <span class="token number">18</span>
        targetSdkVersion <span class="token number">26</span>
        versionCode <span class="token number">1</span>
        versionName <span class="token string">&#39;1.0&#39;</span>
        testInstrumentationRunner <span class="token interpolation-string"><span class="token string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span></span>
    <span class="token punctuation">}</span>
    buildTypes <span class="token punctuation">{</span>
        debug <span class="token punctuation">{</span>
            minifyEnabled <span class="token boolean">false</span>
            proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android-optimize.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
        <span class="token punctuation">}</span>
        release <span class="token punctuation">{</span>
            minifyEnabled <span class="token boolean">false</span>
            proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android-optimize.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

tasks<span class="token punctuation">.</span><span class="token function">withType</span><span class="token punctuation">(</span>org<span class="token punctuation">.</span>jetbrains<span class="token punctuation">.</span>kotlin<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>tasks<span class="token punctuation">.</span>KotlinCompile<span class="token punctuation">)</span><span class="token punctuation">.</span>all <span class="token punctuation">{</span>
    kotlinOptions <span class="token punctuation">{</span>
        jvmTarget <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.8&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    implementation <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-stdlib-jdk7:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>
    implementation <span class="token interpolation-string"><span class="token string">&quot;androidx.appcompat:appcompat:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">jetpack_appcompat_version</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br></div></div><h2 id="verifying-the-firstclasstransformer" tabindex="-1"><a class="header-anchor" href="#verifying-the-firstclasstransformer" aria-hidden="true">#</a> Verifying the FirstClassTransformer</h2><p>In the <em>Android</em> project, execute the <em>assemble</em> task:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ ./gradlew assembleDebug
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Observe the console standard output to see if it contains content like:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Transforming kotlinx/android/parcel/TypeParceler
Transforming androidx/appcompat/graphics/drawable/AnimatedStateListDrawableCompat$1
Transforming androidx/appcompat/app/ActionBar$NavigationMode
Transforming kotlinx/android/parcel/WriteWith
Transforming kotlinx/android/parcel/IgnoredOnParcel
Transforming kotlinx/android/parcel/RawValue
Transforming kotlinx/android/parcel/Parcelize
Transforming androidx/appcompat/app/ActionBar$DisplayOptions
Transforming kotlinx/android/extensions/LayoutContainer
Transforming androidx/appcompat/app/ActionBarDrawerToggle$Delegate
Transforming androidx/appcompat/app/ActionBar$TabListener
Transforming androidx/appcompat/app/ActionBar$OnMenuVisibilityListener
Transforming kotlin/jvm/internal/Ref$DoubleRef
......
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,10))],64)}var f=c(u,[["render",k]]);export{f as default};
