"use client";

import {motion, useReducedMotion} from 'framer-motion';
import type {ReactNode} from 'react';

const capabilities = ['AI Visual Design', 'AI Video', 'E-commerce Design', 'Digital Human', 'Storyboard', 'Creative Direction'];
const tools = ['Photoshop', 'Premiere Pro', 'After Effects', 'Midjourney', 'Stable Diffusion', 'ComfyUI', 'Kling', 'Runway'];

function Reveal({children, className = ''}: {children: ReactNode; className?: string}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .08}} transition={{duration: .4}}>{children}</motion.div>;
}

export function AboutProfile() {
  return <section id="about" className="about-profile section" aria-labelledby="profile-heading">
    <Reveal className="profile-heading"><h2 id="profile-heading">ABOUT</h2><p>PROFILE / 2026</p></Reveal>
    <div className="profile-layout">
      <Reveal className="profile-photo-column"><div className="profile-photo"><img src="/media/profile/jiang-yingxin.jpg" alt="姜颖心的个人照片" width={2268} height={3024} loading="lazy" /></div><p className="profile-photo-caption">姜颖心 <span>AIGC CREATIVE DESIGNER</span></p></Reveal>
      <div className="profile-information">
        <Reveal><header className="profile-intro"><p className="profile-role">AIGC CREATIVE DESIGNER</p><h3>姜颖心</h3><p className="profile-bio">专注 AIGC 电商视觉、AI 视频与数字内容设计，覆盖创意策划、视觉生成、分镜设计、数字人与后期输出。</p><div className="profile-contacts"><a href="tel:13922310482"><span>TEL</span>13922310482</a><a href="mailto:3336446870@qq.com"><span>MAIL</span>3336446870@qq.com</a></div></header></Reveal>
        <Reveal><section className="profile-block" aria-labelledby="education-heading"><h4 id="education-heading">EDUCATION</h4><p className="profile-primary">华南农业大学 · 艺术学院</p><p className="profile-secondary">产品设计 / 本科</p></section></Reveal>
        <Reveal><section className="profile-block" aria-labelledby="experience-heading"><h4 id="experience-heading">EXPERIENCE</h4><div className="profile-job-heading"><p className="profile-primary">贵州一枝梅信息科技有限公司</p><p className="profile-date">2025.02 — 2025.06</p></div><p className="profile-secondary">AIGC 创意设计师</p><ul className="profile-experience"><li>负责 C 端 AI 产品及 B 端商户营销视觉设计，覆盖海报、短视频、数字人及品牌物料。</li><li>搭建可复用营销模板与视觉资产库，提升商户内容生产效率。</li><li>参与 LoRA 品牌画风训练与落地，协同产品、运营优化会员及营销场景。</li></ul></section></Reveal>
        <Reveal><section className="profile-block" aria-labelledby="capabilities-heading"><h4 id="capabilities-heading">CAPABILITIES</h4><ul className="profile-text-grid">{capabilities.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>
        <Reveal><section className="profile-block profile-tools" aria-labelledby="tools-heading"><h4 id="tools-heading">TOOLS</h4><ul className="profile-text-grid">{tools.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>
      </div>
    </div>
  </section>;
}
