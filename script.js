function start()
{
	var gridbox = document.getElementsByClassName('grid-box')[0];
	var gamebox = document.getElementsByClassName('game-box')[0];
	function twoRandomBoxes() {
		var x1 = parseInt(Math.random()*(4-1) + 1);
		var y1 = parseInt(Math.random()*(4-1) + 1);
		do
		{
			var x2 = parseInt(Math.random()*(4-1) + 1);
			var y2 =  parseInt(Math.random()*(4-1) + 1);
		} while(x2==x1 && y2==y1);
		createTile(x1, y1, 1);
		createTile(x2, y2, 2);
	}
	function createTile(x, y, count)
	{
		var div = document.createElement('div')
		gamebox.appendChild(div);
		div.style.transform = "translate("+x*110+"px,"+y*110+"px)";
		div.className='new-tile tile'+count;
		div.innerHTML+=parseInt(Math.random()*(3-1)+1)*2;
	}
	twoRandomBoxes();
}
start();