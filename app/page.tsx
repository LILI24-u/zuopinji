"use client";
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {motion,useScroll,useTransform,useReducedMotion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import assets from '@/lib/assets.json';
import Link from 'next/link';
import {AboutProfile} from '@/components/about-profile';
import {ZezeCollage} from '@/components/zeze-artwork';
import {portfolio,services} from '@/lib/portfolio';
function FadeIn({children,delay=0,x=0,y=30,className=''}:{children:ReactNode;delay?:number;x?:number;y?:number;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,margin:'50px',amount:0}} transition={{delay,duration:.7,ease:[.25,.1,.25,1]}}>{children}</motion.div>}
function Magnet({children}:{children:ReactNode}){const ref=useRef<HTMLDivElement>(null);const [position,setPosition]=useState({x:0,y:0,active:false});const reduced=useReducedMotion();useEffect(()=>{if(reduced||!matchMedia('(pointer:fine)').matches)return;function move(e:MouseEvent){const r=ref.current?.getBoundingClientRect();if(!r)return;const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;const active=Math.abs(x)<r.width/2+150&&Math.abs(y)<r.height/2+150;setPosition({x:active?x/3:0,y:active?y/3:0,active})}function reset(){setPosition({x:0,y:0,active:false})}window.addEventListener('mousemove',move,{passive:true});document.addEventListener('mouseleave',reset);return()=>{window.removeEventListener('mousemove',move);document.removeEventListener('mouseleave',reset)}},[reduced]);return <div ref={ref}><div style={{transform:`translate3d(${position.x}px,${position.y}px,0)`,transition:position.active?'transform .3s ease-out':'transform .6s ease-in-out',willChange:'transform'}}>{children}</div></div>}
function MarqueeSection(){
 const ref=useRef<HTMLElement>(null);
 const rows=useRef<(HTMLDivElement|null)[]>([]);
 const reduced=useReducedMotion();
 const clips=[{name:'hidream',label:'HiDREAM 品牌概念 TVC — 22–27 秒'},{name:'mv',label:'MV — 1–3 秒'},{name:'hunter',label:'全职猎人概念片头 — 1–4 秒'},{name:'zeze',label:'ZEZE 产品广告 — 1–4 秒'}];
 useEffect(()=>{
  if(reduced)return;
  let frame=0;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   if(!ref.current)return;
   const offset=(window.innerHeight-ref.current.getBoundingClientRect().top)*.3;
   rows.current.forEach((row,i)=>{if(row){const cycle=row.scrollWidth/3;const shift=((offset%cycle)+cycle)%cycle;row.style.transform=`translateX(${i?-cycle-shift:-cycle+shift}px)`}});
  })};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[reduced]);
 useEffect(()=>{
  const videos=Array.from(ref.current?.querySelectorAll('video')??[]);
  if(reduced){videos.forEach(video=>video.pause());return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const video=entry.target as HTMLVideoElement;if(entry.isIntersecting){video.muted=true;void video.play().catch(()=>{})}else video.pause()}),{rootMargin:'80px',threshold:.01});
  videos.forEach(video=>observer.observe(video));
  return()=>{observer.disconnect();videos.forEach(video=>video.pause())};
 },[reduced]);
 return <section ref={ref} className="marquee" aria-label="精选视频片段">{[clips,[...clips.slice(2),...clips.slice(0,2)]].map((row,i)=><div className="marquee-row" ref={el=>{rows.current[i]=el}} key={i}>{[...row,...row,...row].map((clip,j)=><video key={`${i}-${j}`} src={`/media/marquee/${clip.name}.mp4`} poster={`/media/marquee/${clip.name}.jpg`} muted loop playsInline preload="none" width="420" height="270" aria-label={j<row.length?clip.label:undefined} aria-hidden={j>=row.length}/>)}</div>)}</section>;
}
function ProjectCard({index,onOpen}:{index:number;onOpen:(i:number)=>void}){const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});const scale=useTransform(scrollYProgress,[0,1],[1,1-(portfolio.projects.length-1-index)*.03]);const reduced=useReducedMotion();const project=portfolio.projects[index];return <div ref={ref} className="project-track"><motion.article id={project.caseHref?"zeze-case":undefined} className="project-card" style={{scale:reduced?1:scale,top:`calc(var(--card-top) + ${index*28}px)`}}><header className="project-header featured-project-header"><span className="project-number">0{index+1}</span><div className="project-title">{project.category&&<span>{project.category}</span>}<h3>{project.name}{project.subtitle&&<span className="project-subtitle">{project.subtitle}</span>}</h3>{index===0&&<p className="project-performance"><span className="performance-label">平台表现</span><span><strong>近 300 万</strong> 播放</span><span><strong>40 万+</strong> 点赞 / 收藏</span></p>}</div>{project.caseHref?<Link className="live-button zeze-case-button" href={project.caseHref}>VIEW CASE <ArrowUpRight size={18}/></Link>:project.links?<div className="project-links">{project.links.map(link=><a key={link.label} className="live-button" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={18} aria-hidden="true"/></a>)}</div>:project.url?<a className="live-button" href={project.url} target="_blank" rel="noreferrer">Live Project <ArrowUpRight size={18}/></a>:<button className="live-button" onClick={()=>onOpen(index)}>Live Project <ArrowUpRight size={18}/></button>}</header>{project.caseHref?<ZezeCollage/>:<div className={`project-video ${project.portrait?"project-video-portrait":""}`}><video controls playsInline preload="none" poster={project.poster} aria-label={project.name}><source src={project.video} type="video/mp4"/>Your browser does not support video playback.</video></div>}</motion.article></div>}
export default function Home(){const [dialog,setDialog]=useState<number|null>(null);const contact=()=>setDialog(-1);function ContactButton(){return <button className="contact-button" onClick={contact}>Contact Me</button>};return <main><section className="hero"><FadeIn delay={0} y={-20}><nav aria-label="Main navigation"><a href="#about">About</a><a href="#price">Price</a><a href="#projects">Projects</a><button onClick={contact}>Contact</button></nav></FadeIn><FadeIn delay={.15} y={40}><h1 className="hero-heading">AI × DESIGN</h1></FadeIn><div className="portrait"><FadeIn delay={.6} y={30}><Magnet><img alt="Jack — 3D creator portrait" src={assets.portrait} fetchPriority="high"/></Magnet></FadeIn></div><div className="hero-bottom"><FadeIn delay={.35} y={20}><p>AI-DRIVEN DESIGNER CRAFTING STRIKING VISUALS AND 3D EXPERIENCES WITH GENERATIVE TOOLS.</p></FadeIn><FadeIn delay={.5} y={20}><ContactButton/></FadeIn></div></section><MarqueeSection/><AboutProfile/><section id="price" className="services section"><FadeIn><h2>Services</h2></FadeIn><div className="service-list">{services.map((s,i)=><FadeIn delay={i*.1} key={s.name}><article className="service"><span className="service-number">0{i+1}</span><div><h3>{s.name}</h3><p>{s.description}</p></div></article></FadeIn>)}</div></section><section id="projects" className="projects section"><FadeIn><h2 className="hero-heading">Project</h2></FadeIn><div className="project-list">{portfolio.projects.map((p,i)=><ProjectCard key={p.name} index={i} onOpen={setDialog}/>)}</div></section><Dialog open={dialog!==null} onOpenChange={open=>{if(!open)setDialog(null)}}><DialogContent className="contact-dialog"><DialogTitle>{dialog===-1?"Let's create something incredible.":dialog!==null?portfolio.projects[dialog].name:''}</DialogTitle><DialogDescription>{dialog===-1?(portfolio.email?'Tell me about your next project.':'Contact details coming soon.'):'The live project link is coming soon.'}</DialogDescription>{dialog===-1&&portfolio.email&&<a className="contact-button" href={`mailto:${portfolio.email}`}>Email Jack <ArrowUpRight size={16}/></a>}</DialogContent></Dialog></main>}











