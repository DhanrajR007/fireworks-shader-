uniform vec2 uResolution;
uniform float uSize;


attribute float aSize;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aSize * uResolution.y;
    gl_PointSize *= 1.0/-viewPosition.z;
}
 