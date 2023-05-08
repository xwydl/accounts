$(function() {
    // $('body').css('backgroundColor', 'skyblue');
    $('.accounts').on('click', '.delBtn', (e) => {
        if (confirm('是否确定删除？')) {
            return true;
        } else {
            e.preventDefault();
        }
    });
})