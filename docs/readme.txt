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

Collection of Points:

@found "Subjects", ->
    @message "invoke", "App", ->
        @message "query", "Constructs"
        @message "iterate", "Measures"
        @message "accumulate", "Points"

Rewarding the Points:

@found "Results", ->
    @message "query", "Goals", ->
        @message "query", "Awards"
        @message "invoke", "Badge"

Meeting the Goals:

@found "Subjects", ->
    @message "query", "Achievements", ->
        @message "query", "Goals"
        @message "query", "Awards"

Disclaimer: index.html should work but it doesn't. yet!
