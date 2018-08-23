#' @import htmlwidgets
#' @export

# You can learn more about package authoring with RStudio at:
#
#   http://r-pkgs.had.co.nz/
#
# Some useful keyboard shortcuts for package authoring:
#
#   Build and Reload Package:  'Cmd + Shift + B'
#   Check Package:             'Cmd + Shift + E'
#   Test Package:              'Cmd + Shift + T'
scatter <- function (matrix,
                     width = NULL,
                     height = NULL,
                     xKey,
                     yKey,
                     rKey,
                     fKeyCategorical,
                     fKeyContinuous,
                     categorical = TRUE,
                     loColor = '#3366cc',
                     mdColor = 'darkgrey',
                     hiColor = '#109618',
                     numColors = 256,
                     enableTransitions = TRUE,
                     hardReload = FALSE,
                     newData = FALSE) {

    # read the matrix
    data <- matrix
    origColnames <- colnames(data)
    data <- cbind(rownames(data), data)
    colnames(data) <- c('key', origColnames)

    options <- list(
        id = 'scatter',
        xKey = xKey,
        yKey = yKey,
        rKey = rKey,
        fKeyCategorical = fKeyCategorical,
        fKeyContinuous = fKeyContinuous,
        categorical = categorical,
        loColor = loColor,
        mdColor = mdColor,
        hiColor = hiColor,
        numColors = numColors,
        enableTransitions = enableTransitions,
        hardReload = hardReload,
        newData = newData
    )

    # pass the data and settings using 'x'
    x <- list(
        data = data,
        options = options
    )

    htmlwidgets::createWidget('scatter', x, width = width, height = height)
}

#' @export
scatterOutput <- function (outputId, width = '100%', height = '400px') {
    shinyWidgetOutput(outputId, 'scatter', width, height, package = 'scatter')
}

#' @export
renderScatter <- function (expr, env = parent.frame(), quoted = FALSE) {
    if (!quoted) { expr <- substitute(expr) } # force quoted
    shinyRenderWidget(expr, scatterOutput, env, quoted = TRUE)
}
