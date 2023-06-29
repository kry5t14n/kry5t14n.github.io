$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function clearGreenClass(){
    $(".sideCategoryHref").each(function() {
        $(this).removeClass('greenUnderscore');
    })
}

$(document).ready(() => {
    $(window).on('resize scroll load', () => {
        if($('#mainContact').isInViewport()){
            clearGreenClass();
            $("#sideContact").addClass('greenUnderscore');
        }else if($('#mainEducation2').isInViewport()){
            clearGreenClass();
            $("#sideEducation").addClass('greenUnderscore');
        }else if($('#mainProjects2').isInViewport()){
            clearGreenClass();
            $("#sideProjects").addClass('greenUnderscore');
        }else if($('#mainExperience2').isInViewport()){
            clearGreenClass();
            $("#sideExperience").addClass('greenUnderscore');
        }else if($('#mainSkills2').isInViewport()){
            clearGreenClass();
            $("#sideSkills").addClass('greenUnderscore');
        }else if($('#mainHome2').isInViewport()){
            clearGreenClass();
            $("#sideHome").addClass('greenUnderscore');
        }
    })

    $('.skillsSection1').on('mouseover', () => {
        $('#htmlImg').attr('src', 'resMain/htmlB.png');
        $('#cssImg').attr('src', 'resMain/cssB.png');
        $('#javascriptImg').attr('src', 'resMain/javascriptB.png');
    })
    $('.skillsSection1').on('mouseout', () => {
        $('#htmlImg').attr('src', 'resMain/html.png');
        $('#cssImg').attr('src', 'resMain/css.png');
        $('#javascriptImg').attr('src', 'resMain/javascript.png');
    })

    $('.skillsSection2').on('mouseover', () => {
        $('#reactImg').attr('src', 'resMain/reactB.png');
        $('#vuejsImg').attr('src', 'resMain/vuejsB.png');
        $('#jqueryImg').attr('src', 'resMain/jqueryB.png');
    })
    $('.skillsSection2').on('mouseout', () => {
        $('#reactImg').attr('src', 'resMain/react.png');
        $('#vuejsImg').attr('src', 'resMain/vuejs.png');
        $('#jqueryImg').attr('src', 'resMain/jquery.png');
    })

    $('.skillsSection3').on('mouseover', () => {
        $('#nodejsImg').attr('src', 'resMain/nodejsB.png');
        $('#wordpressImg').attr('src', 'resMain/wordpressB.png');
        $('#cppImg').attr('src', 'resMain/cppB.png');
    })
    $('.skillsSection3').on('mouseout', () => {
        $('#nodejsImg').attr('src', 'resMain/nodejs.png');
        $('#wordpressImg').attr('src', 'resMain/wordpress.png');
        $('#cppImg').attr('src', 'resMain/cpp.png');
    })
});