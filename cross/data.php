<?php
//$domain = $_POST['domain'];
?>
<script>
//document.domain = '<?= $domain ?>';
//window.parent.callback['success']();
if('postMessage' in window) {
	window.top.postMessage("success", "*");
}else {
	window.parent.name = 'success';
}




</script>