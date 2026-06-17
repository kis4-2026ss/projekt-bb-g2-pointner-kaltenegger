✦ I have addressed the remaining UI and layout issues:

   1. "Liste leeren" Button: Wrapped the list and the button in a content-container, applied the btn-danger class to the "Liste leeren" button, and gave it proper margin, resolving the positioning/shifting
      issue.
   2. Text Wrapping: Removed white-space: nowrap from .todo-title and added word-break: break-word, allowing long titles to wrap properly.
   3. Mobile Layout: Restructured the .todo-item for small screens using flex-wrap and order properties. This prevents the delete button from overlapping with the checkbox or title by forcing it into a new
      line (stacked layout) on screens under 520px.
   4. Verification: Verified the changes with a successful npm run build.