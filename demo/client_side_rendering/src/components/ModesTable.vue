<template>
  <table>
    <tr>
      <td style="width: 20%">Modes:</td>
      <td></td>
    </tr>
    <tr>
      <td><b>Adaptive</b></td>
      <td>Tries to adjust to the page size.</td>
    </tr>
    <tr>
      <td><b>Resizable</b></td>
      <td>
        Has a small arrow on the bottom-right corner (customizable) that you can drag to change the size of the modal.
      </td>
    </tr>
    <tr>
      <td><b>Draggable</b></td>
      <td>
        Allows to drag modal on the screen.
      </td>
    </tr>
    <tr>
      <td><b>Scrollable</b></td>
      <td>
        If <i>height</i> is set to "auto" - <i>scrollable</i> flag will make your modal... scrollable.
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'ModesTable'
}
</script>
