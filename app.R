# if not installed already, run
#   install.packages('htmlwidgets')
#   install.packages('/path/to/scatter_0.1.tar.gz', repos = NULL, type = 'source')
library(htmlwidgets)
library(scatter)

COLORS = list(
    Red = '#dc3912',
    Orange = '#e67300',
    Yellow = '#ff9900',
    Green = '#109618',
    Blue = '#3366cc',
    Purple = '#990099'
)

ui <- fluidPage(

    absolutePanel(top = '0.5%', left = '0.5%', width = '19%', fixed = TRUE,
        wellPanel(style = 'overflow-y: scroll; height: 99vh;',

            fileInput(inputId = 'file',
                      label = 'Choose a file:'),

            radioButtons(inputId = 'rowNamesIndex',
                         label = 'Row names index:',
                         choices = c('none', 1)),

            htmlOutput(outputId = 'xKeyOutput'),

            htmlOutput(outputId = 'yKeyOutput'),

            htmlOutput(outputId = 'rKeyOutput'),

            htmlOutput(outputId = 'fKeyCategoricalOutput'),

            htmlOutput(outputId = 'fKeyContinuousOutput'),

            checkboxInput(inputId = 'categorical',
                          label = 'categorical',
                          value = TRUE),

            selectInput(inputId = 'loColor',
                        label = 'low color',
                        choices = COLORS,
                        selected = '#3366cc'),

            selectInput(inputId = 'hiColor',
                        label = 'high color',
                        choices = COLORS,
                        selected = '#109618'),

            checkboxInput(inputId = 'skip',
                          label = 'skipTransitions',
                          value = TRUE)

        )
    ),

    absolutePanel(top = '0.5%', left = '20%', right = '0.5%', style = 'height: 99vh',

        scatterOutput(outputId = 'scatter', width = '100%', height = '100%')

    )
)

server <- function (input, output) {

    df <- reactive({
        if (is.null(input$file)) {
            return(NULL)
        }

        removeColsWithNas <- function (df) {
            colsWithNas <- NULL
            cnames <- colnames(df)

            for (name in cnames) {
                if (any(is.na(df[, name]))) {
                    colsWithNas <- c(colsWithNas, name)
                }
            }

            df <- df[, !(cnames %in% colsWithNas)]

            return(df)
        }

        getDataFrame <- function (file, rowNamesIndex) {
            if (is.null(file)) {
                return(NULL)
            }

            if (rowNamesIndex == 'none') {
                df <- read.csv(file$datapath, stringsAsFactors = FALSE)
                rownames(df) <- sapply(1:nrow(df), function (j) { return(paste('Row', j)) })
            } else {
                df <- read.csv(file$datapath, row.names = as.numeric(rowNamesIndex), stringsAsFactors = FALSE)
            }

            return(df)
        }

        return(removeColsWithNas(getDataFrame(input$file, input$rowNamesIndex)))
    })

    output$xKeyOutput <- renderUI({
        selectInput(inputId = 'xKey',
                    label = 'x dimension',
                    choices = colnames(df()))
    })

    output$yKeyOutput <- renderUI({
        selectInput(inputId = 'yKey',
                    label = 'y dimension',
                    choices = colnames(df()))
    })

    output$rKeyOutput <- renderUI({
        selectInput(inputId = 'rKey',
                    label = 'r dimension',
                    choices = colnames(df()))
    })

    output$fKeyCategoricalOutput <- renderUI({
        selectInput(inputId = 'fKeyCategorical',
                    label = 'color dimension (categorical)',
                    choices = colnames(df()))
    })

    output$fKeyContinuousOutput <- renderUI({
        selectInput(inputId = 'fKeyContinuous',
                    label = 'color dimension (continuous)',
                    choices = colnames(df()))
    })

    output$scatter <- renderScatter({

        if (is.null(df()) || input$xKey == '') {
            return(NULL)
        }

        scatter(df(), width = '100%', height = '100%',
            xKey = input$xKey,
            yKey = input$yKey,
            rKey = input$rKey,
            fKeyCategorical = input$fKeyCategorical,
            fKeyContinuous = input$fKeyContinuous,
            categorical = input$categorical,
            loColor = input$loColor,
            hiColor = input$hiColor,
            skipTransitions = input$skip)
    })
}

shinyApp(ui, server)
