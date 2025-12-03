import React from 'react';
import { personalData } from '../utils/data/personal-data';
import { FaInstagram, FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ShareCardPage(){
  const social = personalData;
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(180deg,#020317 0%,#06102b 100%)',padding:24}}>
      <div style={{width:440,maxWidth:'94vw',background:'linear-gradient(180deg,#061028 0%,#0b1632 100%)',borderRadius:18,padding:28,color:'white',boxShadow:'0 14px 40px rgba(2,6,23,0.6)'}}>
        <div style={{width:140,height:140,margin:'0 auto 12px',borderRadius:'50%',overflow:'hidden',border:'4px solid rgba(255,255,255,0.06)'}}> 
          <img src="/Bhogesh02.webp" alt={social.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>
        <div style={{fontWeight:700,fontSize:20,textAlign:'center',marginBottom:6}}>{social.name}</div>
        <div style={{fontSize:13,color:'#9aa3b2',textAlign:'center',marginBottom:12}}>{social.designation}</div>

        <div style={{display:'flex',gap:12,justifyContent:'center',marginBottom:12}}>
          <a href={`mailto:${social.email}`} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.03)',color:'#fff',textDecoration:'none'}}>✉️</a>
          <a href={`tel:${social.phone.replace(/\s+/g,'')}`} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.03)',color:'#fff',textDecoration:'none'}}>📞</a>
          <a href={social.github} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.03)',color:'#fff',textDecoration:'none'}}><FaGithub/></a>
          <a href={social.linkedIn} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.03)',color:'#fff',textDecoration:'none'}}><FaLinkedin/></a>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
          <div><strong>Email:</strong> <a href={`mailto:${social.email}`} style={{color:'#bfeee0'}}>{social.email}</a></div>
          <div><strong>Phone:</strong> <a href={`tel:${social.phone.replace(/\s+/g,'')}`} style={{color:'#bfeee0'}}>{social.phone}</a></div>
          <div><strong>Location:</strong> <span style={{color:'#bfeee0'}}>{social.address}</span></div>
        </div>

        <div style={{fontSize:12,color:'#9aa3b2',textAlign:'right',marginTop:12}}>View full profile: <a href="/" style={{color:'#8ae0c6'}}>tamminanabhogesh.info</a></div>
      </div>
    </div>
  );
}
