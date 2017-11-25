function start()
{
	var gamebox = document.getElementsByClassName('game-box')[0];
	var gridbox = document.getElementsByClassName('grid-box')[0];
	var tiles = document.getElementsByClassName('new-tile');
	var score_div = document.getElementsByClassName('score')[0];
	var score=0;
	score_div.innerHTML=score;
	
	document.addEventListener("keydown", keydownFunc);
	
	var grid = new Array();
	for(var i=0; i<4; i++)
		grid[i] = new Array();
	
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++)
			grid[i][j]=0;
	function twoRandomBoxes() {
		createTile();
		createTile();
	}
	function createTile()
	{
		do
		{
			var count=tiles.length;
			if(count<16)
			{
				var flag=0;
				var i=0;
				var x = parseInt(Math.random()*(5-1) + 0);
				var y = parseInt(Math.random()*(5-1) + 0);
				for(i=0; i<count; i++)
				{
					if(((x*110+10+"px")==tiles[i].style.left) && ((y*110+10+"px")==tiles[i].style.top))
					{
						flag=1;
						break;
					}
				}
			}
			else
			{
				gameOver();
				break;
			}
		} while(flag==1);

		// create new div
		var div = document.createElement('div')
		gamebox.appendChild(div);
		div.style.top = y*110+10+"px";
		div.style.left = x*110+10+"px";
		div.className='new-tile';
		var dig = parseInt(Math.random()*(3-1)+1)*2;
		div.innerHTML+=dig;
		
		// update the grid array
		grid[x][y]=dig;
	}
	function keydownFunc(e) 
	{
		if(e.keyCode==39)
		{
			rightKeyPressed();
		}
		else if(e.keyCode==37)
		{
			leftKeyPressed();
		}
		else if(e.keyCode==40)
		{
			downKeyPressed();
		}
		else if(e.keyCode==38)
		{
			upKeyPressed();
		}
	}
	function leftKeyPressed() {
		loop_ran=0;
			for(var row=0; row<4; row++)
			{
				for(var i=1; i<=3; i++)
				{
					var target=i;
					var flag=0;
					if(grid[i][row]!=0)
					{
						for(j=i; j>0; j--)
						{
							if(grid[j-1][row]==0)
							{
								target=j-1;
								flag=1;
							}
							else if(grid[j-1][row]==grid[i][row])
							{
								target=j-1;
								flag=2;
								break;
							}
							else
								break;
						}
						if(flag==1)
						{
							grid[target][row]=grid[i][row];
							grid[i][row]=0;
						}
						else if(flag==2)
						{
							grid[target][row]=grid[i][row]*2;
							score+=grid[target][row];
							score_div.innerHTML=score;
							grid[i][row]=0;
							for(k=0; k<tiles.length; k++)
							{
								if(((target*110+10+"px")==tiles[k].style.left) && ((row*110+10+"px")==tiles[k].style.top))
								{
									tiles[k].innerHTML=grid[target][row];
								}
							}
						}
					}
					for(x=0; x<tiles.length; x++)
					{
						if(((i*110+10+"px")==tiles[x].style.left) && ((row*110+10+"px")==tiles[x].style.top) && target!=i)
						{
							tiles[x].style.left=target*110+10+"px";
							if(flag==2)
							{
								tiles[x].parentNode.removeChild(tiles[x]);
							}
							loop_ran=99; //indication that this loop ran once
							break;
						}
					}
				}
			}
			console.log(loop_ran);
			if(loop_ran==99)
				setTimeout(createTile, 400);
			for(var i=0; i<4; i++)
			{
				var str="";
				for(var j=0; j<4; j++)
				{
					str+=grid[j][i]+", ";
				}
				console.log(str+"\n");
			}
	}
	function rightKeyPressed() {
		loop_ran=0;
			for(var row=0; row<4; row++)
			{
				for(var i=2; i>=0; i--)
				{
					var target=i;
					var flag=0;
					if(grid[i][row]!=0)
					{
						for(j=i; j<3; j++)
						{
							if(grid[j+1][row]==0)
							{
								target=j+1;
								flag=1;
							}
							else if(grid[j+1][row]==grid[i][row])
							{
								target=j+1;
								flag=2;
								break;
							}
							else
								break;
						}
						if(flag==1)
						{
							grid[target][row]=grid[i][row];
							grid[i][row]=0;
						}
						else if(flag==2)
						{
							grid[target][row]=grid[i][row]*2;
							score+=grid[target][row];
							score_div.innerHTML=score;
							grid[i][row]=0;
							for(k=0; k<tiles.length; k++)
							{
								if(((target*110+10+"px")==tiles[k].style.left) && ((row*110+10+"px")==tiles[k].style.top))
								{
									tiles[k].innerHTML=grid[target][row];
								}
							}
						}
					}
					for(x=0; x<tiles.length; x++)
					{
						if(((i*110+10+"px")==tiles[x].style.left) && ((row*110+10+"px")==tiles[x].style.top) && target!=i)
						{
							tiles[x].style.left=target*110+10+"px";
							tiles = document.getElementsByClassName('new-tile');
							if(flag==2)
							{
								tiles[x].parentNode.removeChild(tiles[x]);
							}
							loop_ran=99; //indication that this loop ran once
							break;
						}
					}
				}
			}
			console.log(loop_ran);
			if(loop_ran==99)
				setTimeout(createTile, 400);
			for(var i=0; i<4; i++)
			{
				var str="";
				for(var j=0; j<4; j++)
				{
					str+=grid[j][i]+", ";
				}
				console.log(str+"\n");
			}
	}
	function downKeyPressed() {
		loop_ran=0;
			for(var col=0; col<4; col++)
			{
				for(var i=2; i>=0; i--)
				{
					var target=i;
					var flag=0;
					if(grid[col][i]!=0)
					{
						for(j=i; j<3; j++)
						{
							if(grid[col][j+1]==0)
							{
								target=j+1;
								flag=1;
							}
							else if(grid[col][j+1]==grid[col][i])
							{
								target=j+1;
								flag=2;
								break;
							}
							else
								break;
						}
						if(flag==1)
						{
							grid[col][target]=grid[col][i];
							grid[col][i]=0;
						}
						else if(flag==2)
						{
							grid[col][target]=grid[col][i]*2;
							score+=grid[col][target];
							score_div.innerHTML=score;
							grid[col][i]=0;
							for(k=0; k<tiles.length; k++)
							{
								if(((col*110+10+"px")==tiles[k].style.left) && ((target*110+10+"px")==tiles[k].style.top))
								{
									tiles[k].innerHTML=grid[col][target];
								}
							}
						}
					}
					for(x=0; x<tiles.length; x++)
					{
						if(((col*110+10+"px")==tiles[x].style.left) && ((i*110+10+"px")==tiles[x].style.top) && target!=i)
						{
							tiles[x].style.top=target*110+10+"px";
							tiles = document.getElementsByClassName('new-tile');
							if(flag==2)
							{
								tiles[x].parentNode.removeChild(tiles[x]);
							}
							loop_ran=99; //indication that this loop ran once
							break;
						}
					}
				}
			}
			console.log(loop_ran);
			if(loop_ran==99)
				setTimeout(createTile, 400);
			for(var i=0; i<4; i++)
			{
				var str="";
				for(var j=0; j<4; j++)
				{
					str+=grid[j][i]+", ";
				}
				console.log(str+"\n");
			}
	}
	function upKeyPressed() {
		loop_ran=0;
			for(var col=0; col<4; col++)
			{
				for(var i=1; i<=3; i++)
				{
					var target=i;
					var flag=0;
					if(grid[col][i]!=0)
					{
						for(j=i; j>0; j--)
						{
							if(grid[col][j-1]==0)
							{
								target=j-1;
								flag=1;
							}
							else if(grid[col][j-1]==grid[col][i])
							{
								target=j-1;
								flag=2;
								break;
							}
							else
								break;
						}
						if(flag==1)
						{
							grid[col][target]=grid[col][i];
							grid[col][i]=0;
						}
						else if(flag==2)
						{
							grid[col][target]=grid[col][i]*2;
							score+=grid[col][target];
							score_div.innerHTML=score;
							grid[col][i]=0;
							for(k=0; k<tiles.length; k++)
							{
								if(((col*110+10+"px")==tiles[k].style.left) && ((target*110+10+"px")==tiles[k].style.top))
								{
									tiles[k].innerHTML=grid[col][target];
								}
							}
						}
					}
					for(x=0; x<tiles.length; x++)
					{
						if(((col*110+10+"px")==tiles[x].style.left) && ((i*110+10+"px")==tiles[x].style.top) && target!=i)
						{
							tiles[x].style.top=target*110+10+"px";
							tiles = document.getElementsByClassName('new-tile');
							if(flag==2)
							{
								tiles[x].parentNode.removeChild(tiles[x]);
							}
							loop_ran=99; //indication that this loop ran once
							break;
						}
					}
				}
			}
			console.log(loop_ran);
			if(loop_ran==99)
				setTimeout(createTile, 400);
			for(var i=0; i<4; i++)
			{
				var str="";
				for(var j=0; j<4; j++)
				{
					str+=grid[j][i]+", ";
				}
				console.log(str+"\n");
			}
	}
	twoRandomBoxes();
}
start();