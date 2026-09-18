import type { CSSProperties } from 'react';
export const ZEZE_ARTWORK='/media/zeze-detail/full-page.png';
export const zezeModules={kv:{start:0,height:1200},pain:{start:1200,height:1150},pins:{start:2350,height:1252},clean:{start:3602,height:1200},universal:{start:4802,height:1199},wash:{start:6001,height:1196},details:{start:7197,height:1200},specs:{start:8397,height:1151}};
export function ZezeSlice({module,alt,className='',eager=false}:{module:keyof typeof zezeModules;alt:string;className?:string;eager?:boolean}){
 const crop=zezeModules[module];
 return <div className={`zeze-slice ${className}`} style={{aspectRatio:`675 / ${crop.height}`,'--slice-height':crop.height,'--slice-shift':`${-crop.start/9548*100}%`} as CSSProperties}><div className="zeze-slice-inner"><img src={ZEZE_ARTWORK} width={675} height={9548} alt={alt} loading={eager?'eager':'lazy'} decoding="async"/></div></div>;
}
export function ZezeCollage(){return <div className="zeze-card-collage"><div className="zeze-card-left"><ZezeSlice module="kv" alt="ZEZE 太阳花去浮毛梳详情页首屏"/><ZezeSlice module="pins" alt="140°弯曲针齿核心卖点设计"/></div><ZezeSlice module="universal" alt="ZEZE 猫狗通用产品场景视觉"/></div>}

