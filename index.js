let stats = {"coin": 0,"xp":0,"lvl":0,"name":"","upgrades":[],"boost":1,"cps":0,"cpsMult":1,"clickMult":1}
class Upgrade {constructor(...args) {[this.name, this.lvl, this.cost, this.var, this.onUnlock] = args}}
class Item {constructor(...args) {[this.name, this.cost, this.onUnlock, this.costUp] = args}}
let upgrades = [
    new Upgrade("strong finger &#8544",0,25,"clickMult",1),
    new Upgrade("strong finger &#8545",2,250,"clickMult",2),
    new Upgrade("strong finger &#8546",4,2500,"clickMult",4),
    new Upgrade("strong finger &#8547",6,25000,"clickMult",8),
    new Upgrade("strong finger &#8548",10,250000,"clickMult",16),
    new Upgrade("strong finger &#8549",15,2500000,"clickMult",32),
    new Upgrade("strong finger &#8550",18,25000000,"clickMult",64),
    new Upgrade("strong finger &#8551",20,250000000,"clickMult",128),
    new Upgrade("autoclicker &#8544",1,100,"cpsMult",1),
    new Upgrade("autoclicker &#8545",3,1000,"cpsMult",2),
    new Upgrade("autoclicker &#8546",5,10000,"cpsMult",4),
    new Upgrade("autoclicker &#8547",7,100000,"cpsMult",8),
    new Upgrade("autoclicker &#8548",9,1000000,"cpsMult",16),
    new Upgrade("autoclicker &#8549",11,10000000,"cpsMult",32),
    new Upgrade("autoclicker &#8550",13,100000000,"cpsMult",64),
    new Upgrade("autoclicker &#8551",15,1000000000,"cpsMult",128),
    new Upgrade("lvl boost &#8544",10,1000000,"level",5),
    new Upgrade("lvl boost &#8545",20,100000000,"level",5),
    new Upgrade("lvl boost &#8546",30,10000000000,"level",5),
    new Upgrade("lvl boost &#8547",40,1000000000000,"level",5),
    new Upgrade("lvl boost &#8548",50,100000000000000,"level",5),
]
let items = [
    new Item("finger",10,.1,1.1),
    new Item("witch",100,1,1.2),
    new Item("tower",1000,10,1.3),
    new Item("archer",10000,100,1.4),
    new Item("cassle",100000,1000,1.5),
    new Item("maze",1000000,10000,2),
    new Item("flamethrower",10000000,100000,3),
    new Item("cannon",100000000,1000000,4),
    new Item("all seeing eye",1000000000,10000000,5),
    new Item("iluminati",10000000000,100000000,10),
    new Item("new age",100000000000,1000000000,11),
    new Item("black hole",1000000000000,10000000000,12)
]
let updateDisplays = ()=>{(document.getElementById("coin").innerHTML=Math.floor(stats["coin"]).toLocaleString('en-US', {maximumFractionDigits: 2,notation: 'compact',compactDisplay: 'long'})+"<br>cps: "+(Math.round(stats["cps"]*stats["cpsMult"]*10)/10).toLocaleString('en-US', {maximumFractionDigits: 2,notation: 'compact',compactDisplay: 'long'}));}
let loadb = () => {items.forEach(a => {(b=document.getElementById("upgTemp"),c=b.content.cloneNode(true),c.firstElementChild.innerHTML=c.firstElementChild.innerHTML.replace("1",a.name).replace("2",a.cost.toLocaleString('en-US', {maximumFractionDigits: 2,notation: 'compact',compactDisplay: 'long'})),c.firstElementChild.addEventListener("click",(ev)=>{stats["coin"]>=a.cost&&(stats["coin"]-=a.cost,stats["cps"]+=a.onUnlock,updateDisplays(),a.cost=Math.round(a.cost*a.costUp),ev.currentTarget.innerHTML="<span class='name'>1</span><span class='cost'>2</span>".replace("1",a.name).replace("2",a.cost.toLocaleString('en-US', {maximumFractionDigits: 2,notation: 'compact',compactDisplay: 'long'})))}),document.getElementById("buys").appendChild(c))})};loadb();
let loadups = () => {upgrades.forEach(a => {(a.lvl<=stats["lvl"]&&a.cost!=-1)&&(b=document.getElementById("upgTemp"),c=b.content.cloneNode(true),c.firstElementChild.innerHTML=c.firstElementChild.innerHTML.replace("1",a.name).replace("2",a.cost.toLocaleString('en-US', {maximumFractionDigits: 2,notation: 'compact',compactDisplay: 'long'})),c.firstElementChild.addEventListener("click",(ev)=>{stats["coin"]>=a.cost&&(stats["coin"]-=a.cost,stats[a.var]+=a.onUnlock,updateDisplays(),ev.currentTarget.remove(),a.cost=-1)}),document.getElementById("buys").appendChild(c))})};
let loadupsb = () => {upgrades.forEach(a => {(a.lvl==stats["lvl"]&&a.cost!=-1)&&(b=document.getElementById("upgTemp"),c=b.content.cloneNode(true),c.firstElementChild.innerHTML=c.firstElementChild.innerHTML.replace("1",a.name).replace("2",a.cost.toLocaleString('en-US', {maximumFractionDigits: 2,notation: 'compact',compactDisplay: 'long'})),c.firstElementChild.addEventListener("click",(ev)=>{stats["coin"]>=a.cost&&(stats["coin"]-=a.cost,stats[a.var]+=a.onUnlock,updateDisplays(),ev.currentTarget.remove(),a.cost=-1)}),document.getElementById("buys").appendChild(c))})};loadupsb()
let checkLevel = () => {stats["xp"]>(stats["lvl"]*2+5)**2&&((stats["xp"]-=(stats["lvl"]*2+5)**2),(stats["lvl"]+=1),loadupsb())}
document.getElementById("energy").addEventListener("click",(ev) => {stats["coin"]+=stats["boost"]*stats["clickMult"];stats["xp"]+=1;updateDisplays();checkLevel()})
setInterval(()=>{stats["coin"]+=stats["cps"]*stats["cpsMult"];updateDisplays()},1000)
function save(){localStorage.setItem("savep1",JSON.stringify(stats));localStorage.setItem("savep2",JSON.stringify(items));localStorage.setItem("savep3",JSON.stringify(upgrades));}
function load(){stats=JSON.parse(localStorage.getItem("savep1"));items=JSON.parse(localStorage.getItem("savep2"));upgrades=JSON.parse(localStorage.getItem("savep3"));document.getElementById("buys").innerHTML="";loadb();loadups();updateDisplays()}
