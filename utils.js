function linearInterpolation(left, right, percentage){
    return left + (right-left)*percentage;
}


// Return coordinate where 2 lines touch
// {
//     intersect: boolean,
//     segmentAB: input 1,
//     segmentCD: input 2,
//     intersection: {x:, y:}, X is the intersection
//     offset: percentage, how far the intersection is from A
// }
function getIntersection(segmentAB, segmentCD){
    let a = segmentAB.start;
    let b = segmentAB.end;

    let c = segmentCD.start;
    let d = segmentCD.end;

    let tTop = (a.y-c.y)*(d.x-c.x)-(a.x-c.x)*(d.y-c.y);
    let bottom = (d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y);
    let uTop = (a.y-c.y)*(b.x-a.x)-(a.x-c.x)*(b.y-a.y);
    if(bottom == 0){
        return {intersect: false};
    }

    let t = tTop / bottom;
    let u = uTop / bottom;

    if(t < 0 || t > 1 || u < 0 || u > 1){
        return {intersect: false};
    }

    // verify
    // let x = linearInterpolation(a.x, b.x, t);
    // let y = linearInterpolation(a.y, b.y, t);
    // let x2 = linearInterpolation(c.x, d.x, u);
    // let y2 = linearInterpolation(c.y, d.y, u);
    // TODO(shunxian): this does not work with the two edges
    // if(x != x2 || y != y2){
    //     console.log("Intersection verification failed");
    //     return {intersect:false};
    // }

    return {intersect: true, 
        segmentAB: {start:a, end:b},
        segmentCD: {start:c, end:d},
        intersection: {x: linearInterpolation(a.x, b.x, t), y: linearInterpolation(a.y, b.y, t)},
        offset: t
    };
}

// Return
// [{start:{x:, y:}, end:{x:, y:}}, {start:{x:, y:}, end:{x:, y:]
function connectPoints(polyGonPoints){
    let lines = [];
    for(let i = 0; i < polyGonPoints.length; i++){
        lines.push({
            start: polyGonPoints[i], 
            end: polyGonPoints[(i+1)%polyGonPoints.length]
        });
    }
    return lines;
}

function drawLines(segments, ctx, color){
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    segments.forEach(segment => {
        ctx.beginPath();
        ctx.moveTo(segment.start.x, segment.start.y);
        ctx.lineTo(segment.end.x, segment.end.y);
        ctx.stroke();
    })
}

function drawIntersection(intersectionResult, ctx){
    if (intersectionResult == null){
        return;
    }
    if (intersectionResult.intersect == false){
        return;
    }
    //drawLines([intersectionResult.segmentAB], ctx, "black");
    drawLines([intersectionResult.segmentCD], ctx, "black")
    //drawDot(intersectionResult.intersection, ctx, "purple");
}

function drawDot(point, ctx,color){
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}