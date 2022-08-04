import { ICarBody, ICarResponse } from '../../restApi/template';
import { GarageCar } from './garageCar';
export  class CarRow {
    private container: HTMLElement;
    private car: GarageCar;
    static TextObject = {
        Row: 'row_container',
        Options: 'car_options',
        Controls: 'car_controls',
        Road: 'car__road',
        Finish: 'car_finish',
    }
    mark: string;
    constructor(private data: ICarResponse) {
        this.container = document.createElement('div');
        this.container.className = CarRow.TextObject.Row;
        this.container.id = data.id.toString();
        this.container.dataset.mark = data.name; 
        this.data = data;
        this.mark = data.name;
        this.car = new GarageCar(this.data);
        console.log(this.container.dataset.mark);
    }
    private createCarOptions(className: string) {
        const controls = document.createElement('div');
        controls.className = className;
        controls.innerHTML = `<button id="selectCar" class="button btn-1" type="button">SELECT</button>
                              <button id="removeCar" class="button btn-2" type="button">REMOVE</button>
                              <h6 class="mark">${this.mark}</h6>`
        return controls;
    }
    private createCarControls(className: string) {
        const controls = document.createElement('div');
        controls.className = className;
        controls.innerHTML = `<button id="startCar" class="button btn-1" type="button">A</button>
                              <button id="stopCar" class="button btn-2" type="button" disabled>B</button>`
        return controls;
    }
    private createCarRoad(className: string) {
        const road = document.createElement('hr');
        road.className = className;
      return road
    }
    private createCarFinish(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="1.2em" height="1.2em" viewBox="0 0 1280.000000 1228.000000"
        preserveAspectRatio="xMidYMid meet">
       <metadata>
       Created by potrace 1.15, written by Peter Selinger 2001-2017
       </metadata>
       <g transform="translate(0.000000,1228.000000) scale(0.100000,-0.100000)"
       fill="#f44336" stroke="none">
       <path d="M10310 12228 c-179 -164 -475 -378 -710 -513 -460 -266 -1074 -491
       -1790 -655 -102 -23 -202 -46 -222 -51 l-37 -9 14 -48 c7 -26 23 -81 34 -122
       177 -660 423 -1570 533 -1975 38 -143 72 -263 74 -266 4 -7 162 26 339 72 188
       48 624 194 648 218 4 4 -55 178 -132 387 -76 208 -216 591 -311 849 -95 259
       -192 525 -217 593 -25 68 -44 124 -42 126 2 2 69 22 149 45 516 151 990 374
       1437 676 68 46 125 80 127 77 3 -6 699 -1737 722 -1795 10 -26 -402 -322 -676
       -487 -248 -149 -582 -306 -870 -409 -80 -28 -152 -55 -161 -59 -14 -6 -5 -38
       66 -232 45 -124 157 -434 250 -690 326 -904 446 -1234 449 -1237 10 -10 401
       185 606 302 400 227 659 416 1023 749 54 49 99 87 101 85 2 -2 90 -224 196
       -494 106 -269 255 -647 331 -838 l137 -348 -60 -77 c-141 -179 -446 -460 -733
       -675 -318 -238 -914 -601 -928 -565 -2 7 -154 425 -337 928 -183 503 -334 917
       -336 919 -2 2 -57 -21 -121 -52 -161 -76 -321 -144 -510 -215 -178 -67 -457
       -159 -497 -164 -26 -3 -48 44 -1305 2872 l-1279 2875 -134 6 c-73 4 -245 7
       -383 8 -1652 7 -3126 -448 -4301 -1327 -186 -138 -424 -338 -424 -354 0 -7 85
       -228 189 -492 193 -489 630 -1599 851 -2161 163 -413 822 -2088 1000 -2540 78
       -198 315 -801 527 -1340 212 -539 411 -1044 442 -1123 l57 -142 81 102 c272
       347 726 801 1178 1179 1249 1043 2811 1905 3465 1912 170 2 262 -38 312 -136
       29 -58 22 -202 -15 -305 -81 -226 -310 -571 -567 -857 -106 -117 -210 -227
       -210 -221 0 3 26 47 58 98 224 357 326 626 292 769 -22 92 -94 139 -214 139
       -308 0 -924 -335 -1333 -724 l-106 -101 23 -45 c104 -206 284 -379 495 -476
       523 -240 1348 -170 2345 201 941 350 1913 946 2490 1525 140 141 280 310 358
       434 l53 83 -200 504 c-211 534 -463 1171 -811 2049 -117 294 -301 760 -410
       1035 -109 275 -293 741 -410 1035 -117 294 -297 751 -402 1015 -104 263 -192
       484 -196 491 -5 8 -26 -5 -62 -38z m-3912 -1415 c247 -533 378 -829 371 -833
       -6 -4 -54 -10 -107 -14 -434 -30 -1127 -161 -1603 -302 -128 -38 -434 -140
       -518 -174 -30 -11 -58 -17 -62 -13 -9 10 -750 1860 -756 1890 -5 19 4 24 83
       48 514 157 1044 219 1900 223 l310 2 382 -827z m-1891 -1410 c22 -51 546
       -1260 880 -2032 62 -145 110 -268 106 -272 -5 -5 -118 -65 -252 -134 -758
       -392 -1324 -750 -1854 -1173 -65 -52 -121 -92 -124 -89 -9 9 -953 2467 -953
       2480 1 22 338 273 610 454 310 207 641 396 995 569 238 117 534 252 553 253 7
       1 25 -25 39 -56z m3261 -1690 c11 -27 174 -392 362 -813 188 -421 345 -773
       347 -782 4 -13 -5 -19 -39 -27 -108 -27 -417 -135 -563 -197 -406 -172 -917
       -450 -1349 -731 -87 -57 -162 -101 -167 -96 -4 4 -130 301 -279 658 -150 358
       -339 810 -421 1005 -82 195 -147 360 -145 366 6 15 296 132 586 237 522 189
       1022 329 1440 402 74 12 151 24 171 24 34 1 38 -2 57 -46z"/>
       <path d="M285 10362 c-154 -69 -281 -126 -282 -127 -3 -2 83 -247 837 -2400
       210 -599 568 -1622 796 -2272 228 -651 601 -1717 830 -2370 229 -654 573
       -1638 766 -2188 192 -550 351 -1001 352 -1002 3 -3 947 374 953 381 3 3 -47
       137 -110 298 -136 345 -927 2359 -1462 3723 -207 528 -516 1313 -685 1745
       -434 1105 -1184 3014 -1466 3733 -131 334 -241 606 -244 606 -3 -1 -131 -58
       -285 -127z"/>
       </g>
       </svg>`
        return container;
    }
    render () {
        const [options, controls, finish, road, car] = [
            this.createCarOptions(CarRow.TextObject.Options),
            this.createCarControls(CarRow.TextObject.Controls),
            this.createCarFinish(CarRow.TextObject.Finish),
            this.createCarRoad(CarRow.TextObject.Road),
            this.car.create()];
        this.container.append(options);
        this.container.append(controls);
        this.container.append(car);
        this.container.append(finish);
        this.container.append(road);
        return this.container;
    } 
}