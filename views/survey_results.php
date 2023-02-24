<!doctype html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/dashboard.css?=<?php echo time() ?>" />
  <link rel="stylesheet" href="css/all.css" />
  <title>Survey Results</title>

  <?php include 'scripts.php'; ?>
</head>
<body>
  <main>
    <div id="root">
      
    <div id='dashboard-top'>
                    <div id="survey-nav">
                        <nav>
                            <a href="" id="surveys">Surveys</a>/
                            <?php echo $survey->survey_name ?>
                        </nav>
                    </div>
                    <div id="top-sidebar">
                        <div id="publish-container">
                            <button type='button' id="preview" class="me-3">
                                <svg class="SVGInline-svg" width="16" height="11" viewBox="0 0 16 11" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.532 5.895c0 .825-.672 1.493-1.502 1.493S6.528 6.72 6.528 5.895c0-.824.673-1.492 1.502-1.492.83 0 1.502.668 1.502 1.492z">
                                    </path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.004 2.483A8.82 8.82 0 0 0 0 5.985a9.1 9.1 0 0 0 2.904 3.383 8.884 8.884 0 0 0 10.746-.386A8.783 8.783 0 0 0 16 5.985a8.843 8.843 0 0 0-3.184-3.592 9.053 9.053 0 0 0-9.812.09zm3.06.567a3.52 3.52 0 0 1 4.424.433 3.472 3.472 0 0 1 .436 4.397A3.5 3.5 0 0 1 9.35 9.163a3.525 3.525 0 0 1-3.819-.755 3.462 3.462 0 0 1-.76-3.795A3.487 3.487 0 0 1 6.063 3.05z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <div id="current_user_right" tabindex="0">
                            <span class="userLogo">
                                <?php echo $user->first_name[0] ?>
                                <div id="userSettings" class="animate__animated">
                                    <div id="userInformation">
                                            <span class="userLogo"><?php echo $user->first_name[0]; ?></span>
                                        <div class="userText">
                                            <h2>
                                                <?php echo $user->first_name; $user->last_name; ?>
                                            </h2>
                                            <p> <?php echo $user->email ?> </p>
                                        </div>
                                    </div>
                                    <div class="logout">
                                        <a href="http://localhost/root3/logout.php" class="logOutButton">Log out</a>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
    </div>
  </main>
  <!-- <div id="main">
      <h1><?php echo htmlspecialchars($survey->survey_name); ?></h1>
      <div id="content">
        <div class="scrollgrid">
          <table class="grid">
            <tr>
              <?php foreach ($survey->questions as $question): ?>
              <th><?php echo htmlspecialchars($question->question_text); ?></th>
              <?php endforeach; ?>
            </tr>
            <?php if (empty($survey->responses)): ?>
              <tr>
                <td colspan="<?php echo count($survey->questions); ?>"><em>No surveys</em></td>
              </tr>
            <?php else: ?>
            <?php foreach ($survey->responses as $response): ?>
              <tr>
                <?php foreach ($survey->questions as $question): ?>
                <td><?php $field = 'question_' . htmlspecialchars($question->question_id); echo htmlspecialchars($response->$field); ?></td>
                <?php endforeach; ?>
              </tr>
            <?php endforeach; ?>
            <?php endif; ?>
          </table>
        </div>
      </div>
  </div> -->
  <script src="js/dashboard.js?=<?php echo time() ?>"></script>
</body>
</html>
