$(document).ready(function() {
	var screenTotal = "";
	var numbers = [];
	var signs = [];
	var sign;
	var total = 0;
	var clearFlag = 0;
	$('#1').on('click',function one(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>1</a>');
			screenTotal += "1";
		}
	})
	$('#2').on('click',function two(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>2</a>');
			screenTotal += "2";
		}
	})
	$('#3').on('click',function three(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>3</a>');
			screenTotal += "3";
		}
	})
	$('#4').on('click',function four(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>4</a>');
			screenTotal += "4";
		}
	})
	$('#5').on('click',function five(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>5</a>');
			screenTotal += "5";
		}
	})
	$('#6').on('click',function six(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>6</a>');
			screenTotal += "6";
		}
	})
	$('#7').on('click',function seven(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>7</a>');
			screenTotal += "7";
		}
	})
	$('#8').on('click',function eight(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>8</a>');
			screenTotal += "8";
		}
	})
	$('#9').on('click',function nine(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>9</a>');
			screenTotal += "9";
		}
	})
	$('#0').on('click',function zero(){
		if(screenTotal.length < 8){
			clearScreen();
			$('.screen').append('<a>0</a>');
			screenTotal += "0";
		}
	})
	$('#plus').on('click',function plus(){
		var display = $('<a>+</a>');
		$('.screen').append(display);
		sign = "plus";
		dumpScreenTotal();
		clearFlag=0;
	})
	$('#minus').on('click',function plus(){
		var display = $('<a>-</a>');
		$('.screen').append(display);
		sign = "minus";
		dumpScreenTotal();
		clearFlag=0;
	})
	$('#times').on('click',function times(){
		var display = $('<a>x</a>');
		$('.screen').append(display);
		sign = "times";
		dumpScreenTotal();
		clearFlag=0;
	})
	$('#divide').on('click',function divide(){
		var display = $('<a>/</a>');
		$('.screen').append(display);
		sign = "divide";
		dumpScreenTotal();
		clearFlag=0;
	})
	$('#period').on('click',function period(){
		clearScreen();
		var display = $('<a>.</a>');
		$('.screen').append(display);
		screenTotal += "."
	})
	$('#clear').on('click',function clear(){
		$('.screen').html('<a></a>');
		screenTotal = "";
		numbers = [];
		signs = [];
		total = 0;
	})
	$('#equals').on('click',function equals(){
		if (screenTotal != ""){
			numbers.push(Number(screenTotal));
			screenTotal = "";
			if (numbers.length >1){
				for (i=0;i<numbers.length-1;i++){
					if (signs[i] == 'times'){
						numbers[i+1] = numbers[i] * numbers[i+1];
						numbers[i] = 0;
						signs[i] = 'plus';
					}
					if (signs[i] == 'divide'){
						numbers[i+1] = numbers[i] / numbers[i+1];
						numbers[i] = 0;
						signs[i] = 'plus';
					}
				}
				total = numbers[0];
				for (i=1;i<numbers.length;i++){
					if (signs[i-1] == 'plus'){
							total += numbers[i];
					}		
					if (signs[i-1] == 'minus'){
							total -= numbers[i];
					}
				}
			}
		}
		if (isNaN(total)){
			total = "error";
		}
		total = Math.round(total*1000)/1000;
		if(total.toString().length>8){
			$('.screen').html("too large!");
		}
		else{
			$('.screen').html(total);
		}
		numbers = [];
		numbers.push(total);
		signs = [];
		clearFlag = 1; //if the next entry is a number, the screen will clear
	})
	function dumpScreenTotal(){
		if (screenTotal != ""){
			numbers.push(Number(screenTotal));
		}
		screenTotal = "";
		signs.push(sign);
		return;
	}
	function clearScreen(){
		if (clearFlag ==1){
			clearFlag =0;
			$('.screen').html('<a></a>');
			screenTotal = "";
			numbers = [];
			signs = [];
			total = 0;
		}
	}
})