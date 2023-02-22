<header>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav>
        <?php if (! empty($user) && $user instanceof Login): ?>
        <div <?php if (in_array(basename($_SERVER['SCRIPT_NAME']), ['user_edit.php', 'users.php'])) {
          echo ' class="selected"';
      } ?>>
          <a href="users.php">
            <i class="fa-solid fa-users mb-2"></i>
            Users
          </a>
        </div>
        <div <?php if (in_array(basename($_SERVER['SCRIPT_NAME']), ['survey_edit.php', 'surveys.php'])) {
          echo ' class="selected"';
      } ?>>
          <a href="surveys.php">
            <i class="fa-solid fa-pen mb-2"></i>
            Surveys
          </a>
        </div>
        <div>
          <a href="logout.php">
            <i class="fa-solid fa-right-from-bracket mb-2"></i>
            Logout
          </a>
        </div>
        <?php else: ?>
        <?php endif; ?>
      </nav>
    </header>