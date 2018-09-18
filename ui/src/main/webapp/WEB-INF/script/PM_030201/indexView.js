$(function () {
    PageLoad();
});

function PageLoad(){
    $.ajax({
        url: AppUrl + 'PM_03/PM_PROJECT_YEAR_VIEW_SEL',
        type: "post",
        async: false,
        data: {
            V_V_YEAR: '2019',
            V_V_PERCODE: $.cookies.get('v_personcode')
        },
        dataType: "json",
        traditional: true,
        success: function (resp) {
            alert(resp);
        }
    });
}
