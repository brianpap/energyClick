let stats = {"coin": 0,"xp":0,"lvl":0,"name":"","upgrades":[],"boost":1,"cps":0,"cpsMult":1,"clickMult":1}
class Upgrade {constructor(...args) {[this.name, this.lvl, this.cost, this.onUnlock] = args}}
class Item {constructor(...args) {[this.name, this.cost, this.onUnlock, this.costUp] = args}}
let upgrades = [
    new Upgrade("strong finger &#8544",0,25,()=>{stats["clickMult"]+=1}),
    new Upgrade("strong finger &#8545",2,250,()=>{stats["clickMult"]+=2}),
    new Upgrade("strong finger &#8546",4,2500,()=>{stats["clickMult"]+=4}),
    new Upgrade("strong finger &#8547",6,25000,()=>{stats["clickMult"]+=8}),
    new Upgrade("autoclicker &#8544",1,100,()=>{stats["cpsMult"]+=1}),
    new Upgrade("autoclicker &#8545",3,1000,()=>{stats["cpsMult"]+=2}),
    new Upgrade("autoclicker &#8546",5,10000,()=>{stats["cpsMult"]+=4}),
    new Upgrade("autoclicker &#8547",7,100000,()=>{stats["cpsMult"]+=5}),
]
let items = [
    new Item("finger",10,()=>{stats["cps"]+=.1},1.1),
    new Item("witch",100,()=>{stats["cps"]+=1},1.2),
    new Item("tower",1000,()=>{stats["cps"]+=10},1.3),
    new Item("archer",10000,()=>{stats["cps"]+=100},1.4),
    new Item("cassle",100000,()=>{stats["cps"]+=100},1.5),
    new Item("maze",1000000,()=>{stats["cps"]+=1000},1.6)
]
let updateDisplays = ()=>{document.getElementById("coin").innerHTML=Math.floor(stats["coin"])+"<br>cps: "+Math.round(stats["cps"]*stats["cpsMult"]*10)/10}
items.forEach(a => {(b=document.getElementById("upgTemp"),c=b.content.cloneNode(true),c.firstElementChild.innerHTML=c.firstElementChild.innerHTML.replace("1",a.name).replace("2",a.cost),c.firstElementChild.addEventListener("click",(ev)=>{stats["coin"]>=a.cost&&(stats["coin"]-=a.cost,a.onUnlock(),updateDisplays(),a.cost=Math.round(a.cost*a.costUp),ev.currentTarget.innerHTML="<span class='name'>1</span><span class='cost'>2</span>".replace("1",a.name).replace("2",a.cost))}),b.parentElement.appendChild(c))})
let loadups = () => {upgrades.forEach(a => {a.lvl==stats["lvl"]&&(b=document.getElementById("upgTemp"),c=b.content.cloneNode(true),c.firstElementChild.innerHTML=c.firstElementChild.innerHTML.replace("1",a.name).replace("2",a.cost),c.firstElementChild.addEventListener("click",(ev)=>{stats["coin"]>=a.cost&&(stats["coin"]-=a.cost,a.onUnlock(),updateDisplays(),ev.currentTarget.remove())}),b.parentElement.appendChild(c))})};loadups()
let checkLevel = () => {stats["xp"]>(stats["lvl"]*2+5)**2&&((stats["xp"]-=(stats["lvl"]*2+5)**2),(stats["lvl"]+=1),loadups())}
document.getElementById("energy").addEventListener("click",(ev) => {stats["coin"]+=stats["boost"]*stats["clickMult"];stats["xp"]+=1;updateDisplays();checkLevel()})
setInterval(()=>{stats["coin"]+=stats["cps"]*stats["cpsMult"];updateDisplays()},1000)