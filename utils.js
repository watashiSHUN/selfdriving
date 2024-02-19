function linearInterpolation(left, right, percentage){
    return left + (right-left)*percentage;
}


// Return coordinate where 2 lines touch
// {
//     intersect: boolean,
//     segmentXB: {start:{x:, y:}, end:{x:, y:}},
//     offset: percentage, used to determine which one to take
// }
function getIntersection(segmentAB, segmentCD){
    let a = segmentAB.start;
    let b = segmentAB.end;

    let c = segmentCD.start;
    let d = segmentCD.end;

    let tTop = (a.y-c.y)*(d.x-c.x)-(a.x-c.x)*(d.y-c.y);
    let bottom = (d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y);
    if(bottom == 0){
        return {intersect: false};
    }

    let t = tTop / bottom;
    let u = (a.x+ t*(b.x-a.x) - c.x) / (d.x-c.x);

    if(t < 0 || t > 1 || u < 0 || u > 1){
        return {intersect: false};
    }

    return {intersect: true, 
        segmentXB: {
            start:{x: linearInterpolation(a.x, b.x, t), y: linearInterpolation(a.y, b.y, t)}, 
            end:{x:b.x, y:b.y}
        },
        offset: t
    };

}