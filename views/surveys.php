<!doctype html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surveys</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/dashboard.css?=<?php echo time() ?>" />
    <link rel="stylesheet" href="css/all.css" />
    <?php include 'scripts.php'; ?>
    <script type="text/javascript">
        let survey = <?php ob_start(); include 'survey_add.php'; echo json_encode(ob_get_clean()); ?>
    </script>
</head>
<body>
    <main>
        <div id="root">
            <div id='user-container'>
                <div id="current_user">
                    <span class="userLogo">
                        <?php echo $user->first_name[0] ?> 
                        <div class="tooltipp">
                            <p><?php echo $user->first_name; $user->last_name;  ?></p>
                            <span><?php echo $user->email?></span>
                        </div>
                    </span>
                    <h2><?php echo strtolower($user->first_name) ?></h2>
                </div>
            </div>
            <div class="container">
            <div class="main-content">
                <?php if (isset($statusMessage)): ?>
                    <p class="error"><?php echo htmlspecialchars($statusMessage); ?></p>
                <?php endif; ?>
                <div class="main-content-top">
                    <h1>My Surveys</h1>
                    <div class="survey-config">
                        <button type="button" id="add_survey"><i class="fa-solid fa-plus me-2"></i> Add Survey</button>
                        <div class='surveys-view'>
                            <button type="button" class="surveys-view-selected">
                                <svg class="SVGInline-svg me-2" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M1 0h3v4H0V1a1 1 0 0 1 1-1zM5 0h4v4H5zM10 0h3a1 1 0 0 1 1 1v3h-4V0zM0 5h4v4H0zM5 5h4v4H5zM10 5h4v4h-4zM0 10h4v4H1a1 1 0 0 1-1-1v-3zM5 10h4v4H5zM10 10h4v3a1 1 0 0 1-1 1h-3v-4z"></path></g></svg>
                                Grid
                            </button>
                            <button type="button">
                                <i class="fa-solid fa-list-ul me-2"></i>
                                List
                            </button>
                        </div>
                    </div>
                </div>
                <div class="survey-container">
                    <?php if (empty($surveys)): ?>
                        <p>No Surveys</p>
                    <?php endif; ?>
                    <?php asort($surveys) ?>
                    <?php foreach ($surveys as $survey): ?>
                        <a href="survey_edit.php?survey_id=<?php echo htmlspecialchars($survey->survey_id); ?>" class="survey col-md-3">
                                <div class="survey-center">
                                    <h2>
                                    <?php echo htmlspecialchars($survey->survey_name); ?>
                                    </h2>
                                </div>
                                <div class="survey-bottom">
                                    <span class="response">
                                        <?php 
                                            $link = mysqli_connect("localhost","root","","nese"); #sonra deyish parolu
                                            if (!$link) {
                                                die("Connection failed: " .mysqli_connect_error());
                                            }
                                            $sql = "SELECT * FROM `survey_response` Where survey_id = $survey->survey_id";
                                        $result = mysqli_query($link, $sql);
                                        $row = mysqli_num_rows($result);
                                        if($row != 0) echo $row;
                                        else echo 'No';
                                        mysqli_close($link);
                                        ?>
                                         response</span>
                                    <button type="button" class="extra"></button>
                                </div>
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="survey-menu">
            <?php foreach ($surveys as $survey): ?>
                <ul id="menu-<?php echo htmlspecialchars($survey->survey_id) ?>" tabindex="-1" class="drop">
                <li>
                    <a href="survey_edit.php?survey_id=<?php echo   htmlspecialchars($survey->survey_id) ?> ">edit</a>
                </li>
                <li>
                    <button type="button" class='survey_copy'>link copy</span>
                </li>
                <li>
                    <a href="survey_results.php?survey_id=<?php echo htmlspecialchars($survey->survey_id) ?>">View result</a>
                </li>
                <li>
                    <a href="survey_charts.php?survey_id=<?php echo htmlspecialchars($survey->survey_id) ?>">View chart</a>
                </li>
                </ul>
            <?php endforeach ?>
        </div>
        <div id="survey_add_container">
            <?php include 'survey_add.php' ?> 
        </div>
        <div class="overlay"></div>
        </div>
    </main>
    <script src="js/dashboard.js?=<?php echo time() ?>"></script>
</body>
</html>
