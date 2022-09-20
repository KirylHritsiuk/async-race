const form = `<div id="create">
        <input id="createName" class="form__input" type="text"  placeholder="Enter mark car" >
        <input id="createColor" class="form__color" type="color">
        <button id="createBtn" class="button btn-1" type="button">CREATE</button>
    </div>
    <div id="update">
        <input id="updateName" class="form__input" type="text" placeholder="Select mark car on page" disabled>
        <input id="updateColor" class="form__color" type="color">
        <button id="updateBtn" class="button btn-1" type="button" disabled>UPDATE</button>
    </div>
    <div>
        <button id="raceBtn" class="button btn-1" type="button">RACE</button>
        <button id="resetBtn"class="button btn-2" type="button" disabled>RESET</button>
        <button id="generateBtn"class="button btn-1" type="button">GENERATE CARS</button>
    </div>`;

export default form;
