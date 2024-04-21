module.exports = class Command {

  constructor(props) {

      this.data = {
          name: props.name,
          enabled: props.enabled !== undefined ? props.enabled : true,
          alias: props.alias || [],
          description: props.description || "Not description",
          cooldown: props.cooldown || 3,
          args: props.args || [],
          mention: props.mention !== undefined ? props.mention : false,
          userPermissions: props.permissions || [],
          onlyInEvent: props.onlyInEvent || [],
          useEvenWithoutEvent: props.useEvenWithoutEvent !== undefined ? props.useEvenWithoutEvent : false,
      }

      this.execute = props.execute

  }

}