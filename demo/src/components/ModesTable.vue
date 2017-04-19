<template>
  <table>
    <tr>
      <td style="width: 20%">Modes:</td>
      <td></td>
    </tr>
    <tr>
      <td><b>Simple</b></td>
      <td>Yet another boring modal :)</td>
    </tr>
    <tr>
      <td><b>Adaptive</b></td>
      <td>Tries to adjust to the page size</td>
    </tr>
    <tr>
      <td><b>Resizable</b></td>
      <td>
        Has a small arrow on the bottom-right corner (customizable) that you can drag to change the size of the modal
      </td>
    </tr>
    <tr>
      <td><b>Mixed</b></td>
      <td>
        Is resizable, but if the size of the screen is changed - modal will return to its initial size as well as it will try to adapt to the page size
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'ModesTable'
}
</script>
