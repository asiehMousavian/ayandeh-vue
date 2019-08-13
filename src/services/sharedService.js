/* eslint-disable */
export default {
  handleInputLabels () {
    $('.form-control').blur(function () {
      if ($(this).val() !== '') {
        $(this).parent().addClass('visited')
      } else {
        $(this).parent().removeClass('visited')
      }
    })
  },
  checkInputs () {
    $('.form-control').each(function () {
      if ($(this).val() !== '') {
        $(this).parent().addClass('visited')
      } else {
        $(this).parent().removeClass('visited')
      }
    })
  },
  toggleMenu () {
    $('.toggle_menu').click(function () {
      $('.filter_body').css('display', 'block')
      $('.small_menu').animate({'right': '0px'}, 400)
    })
    $('.small_menu .small_menu_close').click(function () {
      $('.filter_body').css('display', 'none')
      $('.small_menu').animate({'right': '-300px'}, 400)
    })
    $('.filter_body').click(function () {
      $('.small_menu').animate({'right': '-300px'}, 300)
      $(this).css('display', 'none')
    })
  }
}
