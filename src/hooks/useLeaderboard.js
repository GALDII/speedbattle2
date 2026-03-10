import{useState,useCallback}from'react';
import{SEED_REACTION,SEED_TYPING}from'../data/leaderboard';
export function useLeaderboard(){
  const[reactionBoard,setReactionBoard]=useState(SEED_REACTION);
  const[typingBoard,setTypingBoard]=useState(SEED_TYPING);
  const addScore=useCallback((type,name,score)=>{
    const entry={id:Date.now(),name,score,date:'Today',isNew:true};
    let position=0;
    if(type==='reaction'){
      setReactionBoard(prev=>{const next=[...prev,entry].sort((a,b)=>a.score-b.score);position=next.findIndex(e=>e.id===entry.id);return next;});
    }else{
      setTypingBoard(prev=>{const next=[...prev,entry].sort((a,b)=>b.score-a.score);position=next.findIndex(e=>e.id===entry.id);return next;});
    }
    return position;
  },[]);
  return{reactionBoard,typingBoard,addScore};
}
