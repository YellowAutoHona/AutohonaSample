      (function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
	 function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
  
    document.getElementById('signinButton').setAttribute('style', 'display: none');
	gapi.client.load('plus','v1',function(){
	gapi.client.plus.people.get({
	'userId':'me'
	}).execute(function(result){
	//document.getElementById('profile').innerHTML=JSON.stringify(result,null,2);
	alert("data found"+profile.id);
	});
	});
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}

