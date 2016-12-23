To try sequence diagram, visit http://jumly.tmtk.net/try.html

Example:

@found "You", ->
  @message "Think", ->
    @message "Write your idea", "JUMLY", ->
      @create "Diagram"
jumly.css "background-color":"#8CC84B"

Actors:

	Subjects
		Constructs Measures Points

		Results Goals Awards Badges

		Achievements
			Goals Awards

Initialization of Points:

@found "App", ->
  @message "boot", ->
    @message "init", "Constructs"
    @message "init", "Measures"
    @message "init", "Points"

e.g. STEM:

@found "STEM", ->
  @message "boot", ->
    @message "set the name as PSS", "Constructs"
    @message "set the type to PSS", "Measures"
    @message "set the name as Question 1", "Measures"
    @message "set the text as 'In the last month, how often have you been upset because of something that happened unexpectedly?'", "Measures"
    @message "set the type to Question 1:Measures", "Points"
    @message "set the name to Q1P1", "Points"

Collection of Points:

@found "Subjects", ->
    @message "invoke", "App", ->
        @message "query", "Constructs"
        @message "iterate", "Measures"
        @message "accumulate", "Points"

e.g. STEM:

@found "Sensor", ->
    @message "push movement data", "STEM", ->
        @message "query for movement construct", "Constructs"
        @message "update the related measure", "Measures"
        @message "accumulate the related point", "Points"
        @message "assign construct to the participant", "Subject"
        @message "calculate total", ->
           @message "save", "Results"
        @message "assign result to the participant", "Subject"

Rewarding the Points:

@found "Results", ->
    @message "query", "Goals", ->
        @message "query", "Awards"
        @message "invoke", "Badge"

e.g. STEM:

@found "STEM", ->
    @message "query (against any matching goal)", "Results", ->
    @message "query", "Goals", ->
        @message "get award(s), if any", "Awards"
    @message "assign/update award(s)", "Results"
    @message "retrieve an asset, if any", "Badge"

Meeting the Goals:

@found "Subjects", ->
    @message "query", "Achievements", ->
        @message "query", "Goals"
        @message "query", "Awards"

Disclaimer: index.html should work but it doesn't. yet!
