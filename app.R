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
                         choices = c(1, 'none')),

            htmlOutput(outputId = 'xKeyOutput'),

            htmlOutput(outputId = 'yKeyOutput'),

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

    output$scatter <- renderScatter({

        if (is.null(df())) {
            return(NULL)
        }

        scatter(df(), width = '100%', height = '100%', xKey = input$xKey, yKey = input$yKey, labelKey = 'income', skipTransitions = input$skip)
    })
}

shinyApp(ui, server)
