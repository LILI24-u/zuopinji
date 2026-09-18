const entries = [
  {category:'AI TITLE SEQUENCE',title:['《全职猎人》概念片头','〈喜鹊谋杀案〉视觉风格实验'],description:'以《全职猎人》为创作对象，结合悬疑片头视觉语言，完成 AI 概念片头的视觉开发、分镜与动态设计。'},
  {category:'BRAND CONCEPT TVC',title:['《栗子的约会清单》','HiDREAM 拼色单肩宠物出行包'],description:'围绕宠物陪伴与共同旅行主题，完成故事策划、分镜设计与 AI 品牌概念 TVC 制作。'},
  {category:'AI E-COMMERCE COMMERCIAL',title:['ZEZE 太阳花去浮毛梳','产品广告'],description:'围绕约 140° 弯曲针齿高效去浮毛这一核心卖点，完成产品洞察、广告创意、AI 视觉生成与视频制作。'},
  {category:'AI NARRATIVE SHORT DRAMA',title:['《系统让我重返十六岁》'],description:'围绕重生与系统题材，完成角色设定、连续剧情分镜、人物一致性控制及 AI 短剧视觉制作。'},
  {category:'AIGC E-COMMERCE DESIGN',title:['ZEZE 太阳花去浮毛梳','电商详情页视觉设计'],description:'从产品卖点与消费者痛点出发，完成视觉策略、AIGC 场景生成、卖点模块设计及完整电商详情页输出。'},
];

export function ProjectContents(){
 return <section id="content" className="contents-section section" aria-labelledby="contents-heading">
  <h2 id="contents-heading">CONTENTS</h2>
  <ol className="contents-list">{entries.map((entry,index)=><li key={entry.category}><a className="contents-row" href={`#project-${index+1}`} aria-label={`0${index+1} ${entry.title.join(' · ')}`}><span className="contents-number" aria-hidden="true">0{index+1}</span><div className="contents-copy"><p className="contents-category">{entry.category}</p><h3>{entry.title.map(line=><span key={line}>{line}</span>)}</h3><p className="contents-description">{entry.description}</p></div></a></li>)}</ol>
 </section>
}
