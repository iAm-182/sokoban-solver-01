import fs from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',L='udlr';
const P=t=>{let r=t.split('\n').filter(x=>x),w=r[0].length,a=new Uint8Array(w*r.length).fill(1),g=[],b=[],p=-1,i=0;for(const s of r)for(const c of s){if(c!='#'){a[i]=0;if('.*+'.includes(c))g.push(i);if('$*'.includes(c))b.push(i);if('@+'.includes(c))p=i}i++}return[w,a,g,b,p]};
const V=(a,g,w)=>{let v=new Uint8Array(a.length),q=[...g];for(let i=0;i<q.length;i++){v[q[i]]=1;for(const d of[-w,w,-1,1]){let y=q[i]-d;if(!a[y]&&!a[y-d]&&!v[y]){v[y]=1;q.push(y)}}}return v};
const S=Z=>{let[w,a,g,b,p]=Z,n=a.length,G=new Set(g),D2=[-w,w,-1,1];let v=V(a,g,w);if(b.some(x=>!v[x]))return 0;let o=new Uint8Array(n),s=new Int32Array(n),e=new Int32Array(n),k=[],t=0,A=[b],F=[-1],Q=[p],T=[0],M=new Set;
const R=(o,f,S2,T2)=>{let l=f,N=0;k[N++]=f;S2[f]=T2;while(N){let q=k[--N];if(q<l)l=q;for(const d of D2){let u=q+d;if(!a[u]&&!o[u]&&S2[u]!=T2){S2[u]=T2;k[N++]=u}}}return l};
const W=(o,f,t)=>{if(f==t)return'';let v=new Int32Array(n).fill(-1),h=[],q=[f];v[f]=f;for(let i=0;i<q.length;i++){let p=q[i];for(let j=0;j<4;j++){let u=p+D2[j];if(a[u]||o[u]||v[u]+1)continue;v[u]=p;h[u]=j;q.push(u)}}let s='';for(let p=t;p!=f;p=v[p])s=L[h[p]]+s;return s};
for(const x of b)o[x]=1;M.add(R(o,p,s,++t)+'|'+b);for(const x of b)o[x]=0;
let f=b.every(x=>G.has(x))?0:-1;
for(let h=0;f<0&&h<A.length;h++){let B=A[h];for(const x of B)o[x]=1;R(o,Q[h],s,++t);let H=t;for(let i=0;i<B.length&&f<0;i++){let u=B[i];for(let j=0;j<4;j++){let d=D2[j],c=u+d;if(s[u-d]!=H||a[c]||o[c]||!v[c])continue;o[u]=0;o[c]=1;let N=B.slice();N[i]=c;N.sort((x,y)=>x-y);let K2=R(o,u,e,++t)+'|'+N;o[c]=0;o[u]=1;if(M.has(K2))continue;if(A.length>=25e4)return 0;M.add(K2);A.push(N);F.push(h);Q.push(u);T.push(j);if(N.every(x=>G.has(x))){f=A.length-1;break}}}for(const x of B)o[x]=0}
if(f<0)return 0;let y=[],x=f;while(x>0){y.push(x);x=F[x]}y.reverse();let r='',q=p,B=b;for(const z of y){let u=Q[z],j=T[z],d=D2[j];for(const c of B)o[c]=1;r+=W(o,q,u-d);for(const c of B)o[c]=0;r+=L[j];q=u;B=A[z]}return[r,q]};
const C=Z=>{let[w,a,g,b,p]=Z,h=a.length/w,J=[];for(let s=0;s<(w>8?2:1);s++)for(let f=0;f<(h>10?2:1);f++){let y0=f?h-8:1,x0=7*s+1,R=[[],[]];for(let y=y0;y<y0+7;y++)for(let x=x0;x<x0+6;x++){let q=y*w+x;if(b.includes(q))R[0].push(q);if(g.includes(q))R[1].push(q)}if(R[0].length)J.push(R)}return J};
const E=t=>{let Z=P(t),J=C(Z);let p=Z[4],m='';for(const r of J){let a=Z[1].slice();for(const o of J)if(o!==r)for(const x of o[0])a[x]=1;let v=S([Z[0],a,r[1],r[0],p]);if(!v)return'';m+=v[0];p=v[1];r[0]=r[1]}return m};
for(const id of fs.readdirSync(I).sort()){let m=E(fs.readFileSync(`${I}/${id}/level.txt`,'utf8'));fs.mkdirSync(`${O}/${id}`,{recursive:true});fs.writeFileSync(`${O}/${id}/solution.txt`,m)}
