<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = [
        "remitente"            => $_POST["remitente"] ?? "",
        "destinatario"         => $_POST["destinatario"] ?? "",
        "competencia"          => $_POST["competencia"] ?? "",
        "accion_excepcional"   => $_POST["accion_excepcional"] ?? "",
        "relacion_competencia" => $_POST["relacion_competencia"] ?? "",
        "impacto_generado"     => $_POST["impacto_generado"] ?? "",
        "correos_notificacion" => "ahernandez@ofimundo.cl, mdiaz@ofimundo.cl"
    ];

    // Reemplaza esta URL por el endpoint real de tu servidor / API
    $ch = curl_init("/api/v1/landing/que-se-note");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    echo json_encode([
        "status"   => $httpCode,
        "response" => json_decode($response, true)
    ]);
}
?>