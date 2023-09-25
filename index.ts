import definePlugin from "@utils/types";

async function doTheThing(this: Component<Props>)
{
    try {
        // something like "if its not an instagram link or has already been dealt with, bail now"
        const { embed } = this.props;
        if (!embed || embed.provider?.name !== "Instagram" || embed.video?.url) return;

        // something like "get the video source from instagram url", and put it in the embed modal
        // I don't know how to do this lol

        //this.forceUpdate(); // not sure if necessary, we'll find out
    } catch (err) {
        new Logger("InstaView_doTheThing").error("Exception: ", err);
    }
}

export default definePlugin
({
    name: "InstaView",
    description: "Allows Instagram videos to be embedded",
    authors: [{name: ["Wiiiiam"],id: 0n},{name: ["Sean"],id: 0n}],

    patches: 
    [{
        find: "this.renderInlineMediaEmbed",
        replacement: 
            {
                match: /(\i).render=function.{0,50}\i\.embed/,
                replace: "$1.componentDidMount=$self.doTheThing,$&"
            }
    }]
});