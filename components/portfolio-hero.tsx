"use client";
import {useEffect,useRef} from 'react';
import {motion,useReducedMotion} from 'framer-motion';

export function PortfolioHero(){
 const reduced=useReducedMotion();
 const video=useRef<HTMLVideoElement>(null);
 useEffect(()=>{const element=video.current;if(!element)return;if(reduced){element.pause();return;}const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)void element.play().catch(()=>{});else element.pause();},{threshold:.15});observer.observe(element);return()=>observer.disconnect();},[reduced]);
 return <section className="portfolio-cover" aria-labelledby="cover-title">
  <nav className="cover-nav" aria-label="Main navigation"><a href="#about">ABOUT</a><a href="#content">CONTENTS</a><a href="#projects">PROJECTS</a><a href="#resume">RESUME</a></nav>
  <div className="cover-video" aria-label="女性数字人视频"><video ref={video} src="/media/hero/lili-headphones.mp4" poster="/media/hero/lili-headphones.jpg" autoPlay muted loop playsInline preload="auto" aria-label="Lili 的 AI 数字人作品" style={reduced?{visibility:'hidden'}:undefined}/>{reduced&&<img src="/media/hero/lili-headphones.jpg" alt="Lili 的 AI 数字人作品"/>}</div>
  <motion.div className="cover-editorial" initial={reduced?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.4}}><p className="cover-eyebrow">PORTFOLIO 2026</p><h1 id="cover-title"><span>AIGC</span><span>DESIGNER</span></h1><div className="cover-description"><p>AIGC designer focused on e-commerce visuals, AI video, digital humans and visual storytelling.</p><small>Open to Work / AIGC Creative Designer</small></div></motion.div>
  <div className="cover-footer"><a className="cover-work-pill" href="#projects">SELECTED WORKS <span aria-hidden="true">↓</span></a></div>
 </section>
}
