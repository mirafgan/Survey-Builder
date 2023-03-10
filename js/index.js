$(() => {
  let attempt = 0;
  let check;
  let check_radio;
  let type;
  let start = new Date()
  const alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  ];
  $('input[type="text"], textarea').on('keydown', function (e) {
    if (e.which == 13 ?? attempt != $(".question-container").length) {
      e.preventDefault()
      vertical('down')
    }
  })
  $(".choice_container").click(function () {
    check = $(this).find('input[type=checkbox]').prop("checked");
    type = $(this).find('input').attr('type');
    if (type == "checkbox") {
      check = !check;
      $(this).toggleClass("choice_selected");
      $(this).find('input[type=checkbox]').prop('checked', check)
    }
    if (type == "radio") {
      $(this).parents('.question-container').find('.choice_container').removeClass("choice_selected")
      $(this).parents('.question-container').find('input[type=radio]').prop('checked', false)
      $(this).addClass("choice_selected");
      $(this).find('input[type=radio]').prop('checked', true)
    }
  });
  $("input[type=text]").attr("placeholder", "Cavabınızı daxil edin");
  $("body").css({ overflow: "hidden" });
  $(".question-container").each((index, item) => {
    if ($(item).find(".question_choice").length !== 0) {
      $(item)
        .find(".question_choice")
        .each((i, cvb) => {
          $(cvb).html(alphabet[i]);
        });
    }
    index < $(".question-container").length - 1
      ? $(item).append(
        '<button class="ok custom-btn btn-hover" type="button">OK <i class="fas text-white fa-check"></i></button>'
      )
      : $(item).append(
        '<div class="submit_button "><button id="submitButton"  type="button" class="custom-btn btn-hover" name="submitButton">Submit</button></div>'
      );
    $(item).css({ top: `${index * 100}%` });
  });
  $(".ok").click(function () {
    console.log(attempt, $(".question-container").length);
    if (attempt >= 0) $(`#up`).removeAttr("disabled");
    if (attempt == $(".question-container").length - 2)
      $(`#down`).attr("disabled", "disabled");
    vertical("down");
  });

  let buttons = $("footer button");
  buttons.each((index, item) => {
    $(item).click(function () {
      if (this.id == "up" && attempt > 0) {
        $(`#down`).removeAttr("disabled");
        vertical(this.id);
      }
      if (this.id == "down" && attempt != $(".question-container").length - 1) {
        $(`#up`).removeAttr("disabled");
        vertical(this.id);
      } else if (attempt <= 0) {
        $(`#up`).attr("disabled", "disabled");
      }
      if (attempt == $(".question-container").length - 1) {
        $(`#down`).attr("disabled", "disabled");
      }
    });
  });
  function vertical(x) {
    if (attempt >= 0) $(`#up`).removeAttr("disabled");
    if (attempt == $(".question-container").length - 2) $(`#down`).attr("disabled", "disabled");
    if (x == "up" && attempt > 0) {
      attempt--;
      $(".question-container").each((index, item) => {
        $(item).animate({ top: "+=100%" }, 600);
        //   $(item).animate({top:'+=100%',opacity:0},400,function(){$(this).animate({opacity:1},600)})
      });
    } else if (x == "down" && attempt != $(".question-container").length) {
      attempt++;
      $(".question-container").each((index, item) => {
        $(item).animate({ top: "-=100%" }, 600);
        // $(item).animate({opacity:1},250,()=>{$(this).animate({opacity:0},250)})
        //   $(item).animate({top:'-=100%',opacity:0},400,function(){$(this).animate({opacity:1},600)})
      });
    }
    console.log(attempt)
  }
  function pres(e) {
    e.onkeypress = function (pr) {
      if (pr.keyCode == 13 && attempt !== $('.question-container').length - 1) {
        vertical('down')
        $('button#submitButton').attr('disabled', 'disabled')
      }
      if (pr.keyCode == 13 && !$('button#submitButton').prop('disabled')) {

      }
      if (pr.keyCode == 13 && attempt == $('.question-container').length - 1) {
        $('button#submitButton').removeAttr('disabled')
      }
    }
  }
  pres(this);

  $('#submitButton').click(function () {

    let req = 0;
    let success = false;
    let filledorNot = 0;
    let total = 0;
    let questionRequired = $('[data-is_required="1"]');
    $('.question-container').each((i, obj) => {
      let h4 = $(obj).find('h4')
      let questionType = h4.data('question_type');
      let questionID = h4.data('question_id');

      switch (questionType) {
        case 'input':
          filledorNot = $(`input[name="question_id[${questionID}]"]`).val().length > 0 ? 1 : 0;
          h4.attr('data-is_required') == 1 ? req += filledorNot : '';
          total += filledorNot ? 1 : 0;
          break;
        case 'textarea':
          filledorNot = $(`textarea[name="question_id[${questionID}]"]`).val().length > 0 ? 1 : 0;
          h4.attr('data-is_required') == 1 ? req += filledorNot : '';
          total += filledorNot ? 1 : 0;
          break;
        case 'radio':
        case 'checkbox':
          filledorNot = $(`input[name="question_id[${questionID}][]"]:checked`).length
          h4.attr('data-is_required') == 1 ? req += filledorNot : '';
          total += filledorNot ? 1 : 0;
          break;
      }

      if (req == questionRequired.length) {
        success = !success
      }
      else {
        success = false
      }
    })
    if (questionRequired.length == 0) success = true;

    if(!success){
       alert('hamisini doldur')
    }
    else {
      let end = new Date();
      let time = Math.trunc((end - start) / 1000);
      $('#time_elapsed').val(time);
      $('#total').val(Math.trunc(total / $('.question-container').length *100));
      $('form').submit()
    }
  })
});

// radio ve checkboxlarin hərf əlavə etmə funksiyası Jquery siz
// window.onload = function(){
//  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// let questions = document.querySelectorAll('.question-container')
// questions.forEach(item=>{
//     item.querySelectorAll('.question_choice').forEach((cvb,index)=>{
//         cvb.innerHTML = alphabet[index]
//     })
// })

// }
