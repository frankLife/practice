<?php
$domain = $_POST['domain'];
?>
<script>
document.domain = '<?= $domain ?>';
window.parent.callback['success']();
window.parent.name = 'success';
</script>