	var menuRight = document.getElementById( 'cbp-spmenu-s2' ),
				showRight = document.getElementById( 'showRight' ),
				menuTop = document.getElementById( 'cbp-spmenu-s3' ),
				showTop = document.getElementById( 'showTop' ),
				menuBottom = document.getElementById( 'cbp-spmenu-s4' ),
				showBottom = document.getElementById( 'showBottom' ),
				body = document.body;

			showRight.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( menuRight, 'cbp-spmenu-open' );
			};
			showTop.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( menuTop, 'cbp-spmenu-open' );
				
			};
			showBottom.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( menuBottom, 'cbp-spmenu-open' );
				disableOther( 'showBottom' );
			};
			function headerDown()
			{
				classie.toggle( showTop, 'active' );
				classie.toggle( menuTop, 'cbp-spmenu-open' );
			}
			function bottomUp()
			{
			 
				classie.toggle( showBottom, 'active' );
				classie.toggle( menuBottom, 'cbp-spmenu-open' );
			}