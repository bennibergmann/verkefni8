# Verkefni 8
Benni forrita verkefni 8 í JavaScript virkni.


## Athugasemdir
Ég þurfti að fikta soldið í package.json og taka /build úr .gitignore til þess að síðan fúnkeraði á Netlify.

Verkefnið er sett upp hérna á Github og á Netlify og þar er svo sannarlega 'build' scripta notuð.
Það er hægt að bæta við vörum í körfu og hægt að eyða þeim líka. 
Fannst smá óljóst með virknina í körfunni. Hvort það ætti t.d. að koma önnur HTML húfa undir hinni HTML húfunni ef maður bætir við annari
en fannst fallegra ef fjöldinn hækkaði frekar bara um 1. 

Heiti        Fjöldi        ...
HTML húfa    3
CSS sokkar   7
HTML húfa    1

^ Þetta er bara ljótt.

Ef maður fjarlægir vöru úr körfu fjarlægjast allar slíkar vörur úr körfunni. Það er ekki hægt að fækka bara um einn CSS sokk frá 7 niður í 6, frekar eyðast þeir bara allir.

Karfan birtist fallega og uppfærist bæði í fjölda og samtals verð.

Taflan og formin eru falin þar til eitthvað er sett í körfu.

Þegar ýtt er á 'Ganga frá kaupum' birtist kvittun með nafni, heimilisfangi, vörum sem keyptar voru og samtals verði. Síðan er hægt að ýta á 'Kaupa meira' og byrja kaupin aftur.

 
## Virkni

Áframhald af „búðinni“ úr verkefni 7, núna með viðmóti.

Nota skal gefið HTML og CSS og útfæra rest af JavaScript virkni:

- Þegar `Bæta við` takki er notaður á að bæta gefnum fjölda við körfu.
- Þegar ekkert er í körfu á að standa `Ekkert í körfu.`.
- Þegar eitthvað er í körfu á að birta þær vörur og nota HTML strúktúr sem er í athugasemd í `index.html`.
- Þegar eitthvað er í körfu skal birta form til að ganga frá kaupum með reit fyrir `Nafn` og `Heimilsfang`.
- Þegar búið er að fylla út í `Ganga frá kaupum` er kvittun birt með möguleika á hlekk til að versla meira: það birtir síðuna eins og hún byrjar fyrst.

## Mat

- 10% Verkefni sett upp GitHub og á Netlify og `build` scripta notuð.
- 20% Hægt að bæta vöru í körfu.
- 20% Hægt að eyða vöru úr körfu.
- 30% Karfa uppfærist með réttri töflu og samtölu.
- 20% Hægt að ganga frá kaupum og byrja kaup aftur.

