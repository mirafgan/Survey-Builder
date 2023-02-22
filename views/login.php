<!doctype html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Survey Builder Login</title>
  <?php include 'loginstylesheet.php'; ?>
  <?php include 'scripts.php'; ?>
  <script type="text/javascript">
    $(function()
    {
        $('#submitButton').button();

        <?php if (! empty($_POST['email'])): ?>
            $('#password').focus();
        <?php else: ?>
            $('#email').focus();
        <?php endif; ?>
    });
  </script>
</head>
<body>
  <div id="main">
    <div id="site_content">
        <span class="animate-1"></span>
        <span class="animate-2"></span>
        <span class="animate-3"></span>
        <span class="animate-4"></span>
      <h1>Survey Builder</h1>
      <p>Salam, de görüm kimsən?</p>
      <div id="content">
        <?php if (isset($statusMessage)): ?>
            <p class="error"><?php echo htmlspecialchars($statusMessage); ?></p>
        <?php endif; ?>
        <form method="post" action="login.php">
          <div class="input_form">
            <div>
              <label>E-mail</label>
              <input type="text" id="email" name="email" spellcheck="false" value="<?php if (isset($_POST['email'])) {
    echo htmlspecialchars($_POST['email']);
} ?>" />
            </div>
            <div>
              <label>Şifrə</label>
              <input type="password" id="password" name="password" value="" />
            </div>
            <div class="submit_button">
              <input type="submit" id="submitButton" name="submitButton" value="Daxil ol" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>
</html>
