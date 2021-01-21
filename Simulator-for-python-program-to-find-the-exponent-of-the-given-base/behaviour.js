window.view = {
	numbers: new Array(),
	lastRedDiv: new Object(),
	nextRedDiv: new Object(),
	i: 1,
	j: 0,
	key: 0,
	m: 0,
	iter:0,
	exp0:0,
	flag:2,
	resultjs:1,
	basejs:0,
	isnegative:0,
	changeClass: function(id, className) {
		document.getElementById(id).className = className
	},
	getLastHighlightedDiv: function() {
		var findClass = document.getElementsByClassName('showDivInRed')
		return findClass[0]
	},
	resetVariables: function() {
		this.numbers = new Array()
		this.lastRedDiv = new Object()
		this.nextRedDiv = new Object()
		this.i = 1
		this.j = 0
		this.key = 0
		this.m = 0
	},
	getNextDivToHighlight: function(lastHighlightedDiv) {
		var next = lastHighlightedDiv.nextSibling
		next = next.nextSibling
		return next
	},
	getNextToNextDivToHighlight: function(lastHighlightedDiv) {
		var next = lastHighlightedDiv.nextSibling
		next = next.nextSibling
		next=next.nextSibling
		return next
	},
	jumpTo: function(targetDivId) {
		var element = document.createElement('div')
		element.id = targetDivId
		return element
	},
	disableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = true
	},
	enableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = false
	},
	addClickEvent: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	/////////////////
	getFirstNum: function() {
		var inputValueFirst = document.getElementById('inputFirstNum').value
		inputValueFirst = Number(inputValueFirst)
		return inputValueFirst
	},
	getSecondNum: function() {
		var inputValueSecond = document.getElementById('inputSecondNum').value
		inputValueSecond = Number(inputValueSecond)
		return inputValueSecond
	},
	
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	activateEvents: function() {															      //$$
		this.enableButton('btnStart')
		this.changeClass( 'btnStart', 'startButton button' )
		this.addClickEvent('btnStart', function() { view.start_s() })
		this.addClickEvent('btnNext', function() { view.next_() })
	},																							  //$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

getUserInput: function() {
	var inputValue = document.getElementById('userInput').value
	inputValue = inputValue.replace(/\s/g, ',')
	this.numbers = inputValue.split(',')
},

createBoxes: function() {
	for ( i = 0 ; i < this.numbers.length ; i++ ) {
		var outerDiv = document.createElement('div')
		outerDiv.className = 'outerDiv'
		var element = document.createElement('div')
		element.innerHTML = this.numbers[i]
		if ( i === 0 )
			element.className = 'sortedArray'
		else if ( i === 1 )
			element.className = 'keyPosition'
		else
			element.className = 'unSortedArray'
		outerDiv.appendChild(element)
		document.getElementById('sortingDiv').appendChild(outerDiv)
	}
},
removeImage: function() {
	var element = document.getElementsByTagName('img')
	if ( element.length > 0 )
		document.getElementById('sortingDiv').removeChild(element[0])
},

showCode: function() {
	document.getElementById('1-dArray').className = 'show, codeLayout'
},
validateUserInputs: function() {
	var result
	for ( i = 0 ; i < this.numbers.length ; i++ ) {
		if ( isNaN(Number(this.numbers[i])) )
			return false
	}
},

getPositionOfElement: function() {
	var elements = document.getElementById('sortingDiv').childNodes
	var posLeft = String(elements[this.j].offsetLeft + 1)
	var posTop = String(elements[this.j].offsetTop + 4)
	var position = []
	position.push(posLeft, posTop)
	return position
},
highlightNextStep: function() {
	this.changeClass(this.lastRedDiv.id, 'show')
	this.changeClass(this.nextRedDiv.id, 'showDivInRed')
},
convertFromStringToNumber: function() {
	for ( i = 0 ; i < this.numbers.length ; i++ )
		this.numbers[i] = Number(this.numbers[i])
},
start_s: function() {
	this.basejs=this.getFirstNum()
	this.exp0=this.getSecondNum()
	this.iter=Math.abs(this.exp0)

	var userInputFirst = this.getFirstNum()
	var userInputSecond = this.getSecondNum()
	if(document.getElementById('inputFirstNum').value!="" && document.getElementById('inputSecondNum').value!="")
	{
		if( isNaN( userInputFirst ) === false && isNaN( userInputSecond ) === false) {

			this.createBoxes()
			this.showCode()
			this.convertFromStringToNumber()
			this.disableButton('btnStart')
			this.changeClass( 'btnStart', 'startButton buttonDisable' )
			this.enableButton('btnNext')
			this.changeClass( 'btnNext', 'button nextButton' )
			this.changeClass( 'line1' , 'showDivInRed')

		}
		else
			alert( 'Both the numbers must be an Integer !' )


	}
	else{
		alert( 'Please enter both the numbers' )
	}

},
swapText: function() {
	var elements = document.getElementById('sortingDiv').childNodes
	elements[this.j + 1].firstChild.innerHTML = elements[this.j].firstChild.innerHTML 
	var temp = this.numbers[this.j]
},

clearDivs: function() {
	document.getElementById('key').innerHTML = 0
	document.getElementById('1-dArray').className = 'hide codeLayout'
	document.getElementById('sortingDiv').innerHTML = ''
	document.getElementById('inputArraySize').value = ''
	document.getElementById('inputButtonRadio').className = 'radioButtonDivision hide'
	document.getElementById('btnRandom').checked = false
	document.getElementById('btnManual').checked = false
},
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	next_: function() {


		if(Number(this.exp0)>=0){

			this.lastRedDiv = this.getLastHighlightedDiv()
			this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
			if(this.lastRedDiv.id === 'line1'){
				document.getElementById("boxNum1").style.background = "orange";
			//document.getElementById("boxNum2").style.background = "orange";
			document.getElementById("boxNum1").innerHTML=Number(this.getFirstNum());
			//document.getElementById("boxNum2").innerHTML=Number(this.getSecondNum());
			this.highlightNextStep()
		}
		else if(this.lastRedDiv.id === 'line2'){
			document.getElementById("boxNum2").style.background = "orange";
			document.getElementById("boxNum2").innerHTML=Number(this.getSecondNum());
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line3' ) {
			document.getElementById("boxNumResult").style.background = "orange";
			document.getElementById("boxNumResult").innerHTML=1
			this.highlightNextStep()
		}
// ******************************************************************************************
else if(this.lastRedDiv.id=='line4'){
	document.getElementById("showIter").innerHTML=this.iter
		//this.nextRedDiv = this.jumpTo('line8')
		this.highlightNextStep()
	}
//*****************************************************8
else if(this.lastRedDiv.id=='line5'){
	if(this.iter!=0){


		if(this.flag!=0){

			if(this.flag===2){
				document.getElementById("boxNumResult").innerHTML=this.resultjs
				document.getElementById("boxOperator").innerHTML="*"
				document.getElementById("boxBase").innerHTML=this.basejs
				document.getElementById("boxBase").style.background = "orange";
				document.getElementById("boxEqual").innerHTML="="
				this.resultjs=this.resultjs*this.basejs
				this.flag=this.flag-1
			}
			else if(this.flag===1){
				document.getElementById("boxNumResultU").innerHTML=this.resultjs
				document.getElementById("boxNumResultU").style.background = "orange";
				this.flag=this.flag-1
			}
		}
		else{
			this.iter=this.iter-1
			this.flag=2
			////
			document.getElementById("boxNumResult").innerHTML=this.resultjs
			document.getElementById("boxOperator").innerHTML=""
			document.getElementById("boxBase").innerHTML=""
			document.getElementById("boxBase").style.background = "white";
			document.getElementById("boxEqual").innerHTML=""
			document.getElementById("boxNumResultU").innerHTML=""
			document.getElementById("boxNumResultU").style.background = "white";
				//make all divs blank and reflect resultjs in first div

			this.nextRedDiv = this.jumpTo('line4')
			this.highlightNextStep()
		}
//execute somthing (flag)
	}
	else{
		this.nextRedDiv = this.jumpTo('line6')
		this.highlightNextStep()
	}
}
// ****************************************************************************
else if (this.lastRedDiv.id=='line6') {
	document.getElementById("print").innerHTML="Exponent of given base is "+document.getElementById("boxNumResult").innerHTML
	document.getElementById("boxNumResult").innerHTML=" "
	document.getElementById("boxNumResult").style.background="white";
	this.disableButton('btnNext')
	this.changeClass( 'btnNext', 'disableButton nextButton' )

	this.highlightNextStep()
}
// ************************************************
else
	{this.highlightNextStep()}
//if case ends!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
}

// ######################################################################################
// ######################################################################################
else{
	this.lastRedDiv = this.getLastHighlightedDiv()
	this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
	if(this.lastRedDiv.id === 'line1'){
		document.getElementById("boxNum1").style.background = "orange";
			//document.getElementById("boxNum2").style.background = "orange";
			document.getElementById("boxNum1").innerHTML=Number(this.getFirstNum());
			//document.getElementById("boxNum2").innerHTML=Number(this.getSecondNum());
			this.highlightNextStep()
// ***************************************************************************************
		}
		else if(this.lastRedDiv.id === 'line2'){
			document.getElementById("boxNum2").style.background = "orange";
			document.getElementById("boxNum2").innerHTML=Number(this.getSecondNum());

			this.highlightNextStep()
		}
// *******************************************************************************************
		else if ( this.lastRedDiv.id === 'line3' ) {
			document.getElementById("boxNumResult").style.background = "orange";
			document.getElementById("boxNumResult").innerHTML=1
			this.highlightNextStep()
		}

// ******************************************************************************
else if(this.lastRedDiv.id=='line03'){
	this.nextRedDiv = this.jumpTo('line06')
	this.highlightNextStep()
}
// *******************************************************************************************
else if(this.lastRedDiv.id=='line07'){
	document.getElementById("showIter").innerHTML=this.iter
	//this.nextRedDiv = this.jumpTo('line8')
	this.highlightNextStep()
}
// ************************************************************************************8
else if(this.lastRedDiv.id=='line08'){
	if(this.iter!=0){


////
		if(this.flag!=0){
			
			if(this.flag===2){
				document.getElementById("boxNumResult").innerHTML=("1/"+this.resultjs)
				document.getElementById("boxOperator").innerHTML="x"
				document.getElementById("boxBase").innerHTML=("1/"+this.basejs)
				document.getElementById("boxBase").style.background = "orange";
				document.getElementById("boxEqual").innerHTML="="
				this.resultjs=this.resultjs*this.basejs
				this.flag=this.flag-1
			}
			else if(this.flag===1){
				document.getElementById("boxNumResultU").innerHTML=("1/"+this.resultjs)
				document.getElementById("boxNumResultU").style.background = "orange";
				this.flag=this.flag-1
			}
		}
		else{
			this.iter=this.iter-1
			this.flag=2
			////
			document.getElementById("boxNumResult").innerHTML=("1/"+this.resultjs)
			document.getElementById("boxOperator").innerHTML=""
			document.getElementById("boxBase").innerHTML=""
			document.getElementById("boxBase").style.background = "white";
			document.getElementById("boxEqual").innerHTML=""
			document.getElementById("boxNumResultU").innerHTML=""
			document.getElementById("boxNumResultU").style.background = "white";
			//make all divs blank and reflect resultjs in first div

			this.nextRedDiv = this.jumpTo('line07')
			this.highlightNextStep()
		}
		//execute somthing (flag)
	}
	else{
		this.highlightNextStep()
	}
}
// *********************************************************************************************
else if (this.lastRedDiv.id=='line6') {
	document.getElementById("print").innerHTML="Exponent of given base is "+(1/this.resultjs)
	document.getElementById("boxNumResult").innerHTML=" "
	document.getElementById("boxNumResult").style.background="white";
	this.disableButton('btnNext')
	this.changeClass( 'btnNext', 'disableButton nextButton' )

	this.highlightNextStep()
}
// *********************************************************************************************
else
	{this.highlightNextStep()}
//else case ends!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

},

init: function() {
	this.activateEvents()
}
}
window.onload = function() { view.init() }

function reloadbn(){
	window.location.reload()
}